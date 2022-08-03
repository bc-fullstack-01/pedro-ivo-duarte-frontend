import { Paper, CardHeader, Avatar } from "@mui/material";
import CustomAvatar from "../CustomAvatar";

interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Paper elevation={0}>
      <CardHeader
        avatar={
          <CustomAvatar profileName={post.profile.name} postTitle={post.title}/>
        }
      ></CardHeader>
    </Paper>
  );
};

export default PostCard;
