import {
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import CustomAvatar from "../CustomAvatar";
import CustomActionIcon from "../CustomActionIcon";

import { Post } from "../../models/Post";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Paper elevation={0} sx={{ marginX: 24 }}>
      <CardHeader
        avatar={<CustomAvatar profileName={post.profile.name} />}
        title={post.title}
      />
      {post.image ? (
        <CardMedia
          component="img"
          image={post.description.replace(/localhost/, "192.168.0.58")}
          alt={post.title}
        />
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <CustomActionIcon commentCount={10} likeCount={5} />
        </div>
      </CardActions>
    </Paper>
  );
};

export default PostCard;
