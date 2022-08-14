import { Box, Button, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAppBar from "../../components/CustomAppBar";
import server from "../../api/server";
import ChangePassForm from "../../components/ChangePassForm";

interface User {
  _id: string;
  user: string;
  password: string;
  createdAt: string;
  updateAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const token = localStorage.getItem("accessToken") as string;
  const [user, setUser] = useState<User>();
  const [isChangingPasswd, setIsChangingPasswd] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await server.get("/users/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        alert(err);
      }
    };
    getUser();
  }, [token]);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleChangePasswd = () => {
    setIsChangingPasswd((prevState) => !prevState);
  };

  console.log(user);

  const date = user?.createdAt.slice(0, 10).split("-").reverse().join("-");
  return (
    <div>
      <CustomAppBar title="Perfil" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>{name}</h1>
        <Stack spacing={2} alignItems="flex-start">
          <Typography>Conta criada em: {date}</Typography>
          {isChangingPasswd && <ChangePassForm token={token} />}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleChangePasswd}
          >
            {!isChangingPasswd ? "Trocar senha" : "Cancelar"}
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Sair
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Profile;
