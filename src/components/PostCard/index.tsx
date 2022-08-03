import { Paper, CardHeader} from "@mui/material";
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
        avatar={<CustomAvatar profileName={post.profile.name}/>}
        title={post.title}
      />
    </Paper>
  );
};

export default PostCard;
