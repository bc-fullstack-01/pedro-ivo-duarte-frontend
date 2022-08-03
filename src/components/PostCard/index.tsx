import { Paper, CardHeader, Avatar } from "@mui/material";

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
          <Avatar>
            {post.profile.name.slice(0, 2)}
            title={post.title}
          </Avatar>
        }
      ></CardHeader>
    </Paper>
  );
};

export default PostCard;
