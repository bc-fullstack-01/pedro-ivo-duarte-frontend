import { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import server from "../../api/server";

interface Props {
  comments: string[];
  likes: string[];
  commentCount: number;
  likeCount: number;
  postId: string;
}

const CustomActionIcon = ({
  commentCount,
  likeCount,
  comments,
  likes,
  postId,
}: Props) => {
  const token = localStorage.getItem("accessToken");
  const profile = localStorage.getItem("profile") as string;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    setLiked(likes.includes(profile));
  }, [profile, likes]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await server.post(`/posts/${postId}/like`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLiked(true);
      } else {
        await server.post(`/posts/${postId}/unlike`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLiked(false);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <IconButton>
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
      <IconButton onClick={handleLike}>
        {liked ? (
          <FavoriteIcon fontSize="small" sx={{ color: "#1976D2" }} />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {likeCount}
      </Typography>
    </div>
  );
};

export default CustomActionIcon;
