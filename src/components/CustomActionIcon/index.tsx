import { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

interface Props {
  comments: string[];
  likes: string[];
  commentCount: number;
  likeCount: number;
}

const CustomActionIcon = ({
  commentCount,
  likeCount,
  comments,
  likes,
}: Props) => {
  const profile = localStorage.getItem("profile") as string;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    setLiked(likes.includes(profile));
  }, [profile, likes]);
  return (
    <div>
      <IconButton>
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
      <IconButton>
        {liked ? (
          <FavoriteIcon fontSize="small" />
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
