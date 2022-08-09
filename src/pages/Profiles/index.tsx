import { useEffect, useState } from "react";
import {
  CardHeader,
  Paper,
  Stack,
  Divider,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar";
import CustomAvatar from "../../components/CustomAvatar";
import server from "../../api/server";

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

const Profiles = () => {
  const token = localStorage.getItem("accessToken");
  const sessionProfile = localStorage.getItem("profile") as string;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await server.get("/profiles", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setProfiles(response.data);
      } catch (err) {
        alert(err);
      }
    };
    getProfiles();
  }, [token]);

  const handleFollow = async (id: string, followers: string[]) => {
    let newProfiles;
    let response;

    try {
      if (!followers.includes(sessionProfile)) {
        response = await server.post(`/profiles/${id}/follow`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        newProfiles = profiles.map((profile) => {
          if (profile._id === id) {
            return {
              ...profile,
              followers: [...profile.followers, sessionProfile],
            };
          } else if (profile._id === sessionProfile) {
            return {
              ...profile,
              following: [...profile.following, id],
            };
          } else {
            return profile;
          }
        });
      } else {
        response = await server.post(`/profiles/${id}/unfollow`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        newProfiles = profiles.map((profile) => {
          if (profile._id === id) {
            return {
              ...profile,
              followers: profile.followers.filter((follower) => follower !== sessionProfile),
            };
          } else if (profile._id === sessionProfile) {
            return {
              ...profile,
              following: profile.following.filter((follower) => follower !== id),
            };
          } else {
            return profile;
          }
        });
      }

      setProfiles(newProfiles);
    } catch (err) {
      alert(err);
    }
  };

  const profilesEL = profiles.map((profile) => (
    <div key={profile._id}>
      <Paper elevation={0}>
        <CardHeader
          avatar={<CustomAvatar profileName={profile.name} />}
          title={profile.name}
        />
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {profile.followers.length} Seguidores
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seguindo {profile.following.length} perfis
            </Typography>
            {/* <div style={{maxWidth: '400px', margin: '0 auto'}}> */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleFollow(profile._id, profile.followers)}
            >
              {profile.followers.includes(sessionProfile) ? 'Deixar de seguir' : 'Seguir'}
            </Button>
            {/* </div> */}
          </Stack>
        </CardContent>
      </Paper>
      <Divider />
    </div>
  ));

  return (
    <div>
      <CustomAppBar title="Perfis" />
      <div style={{ marginTop: "72px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {profilesEL}
        </Stack>
      </div>
    </div>
  );
};

export default Profiles;
