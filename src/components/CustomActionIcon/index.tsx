import { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import { ChatBubbleOutline as ChatBubbleOutlineIcon } from "@mui/icons-material";
import server from "../../api/server";

import CustomFavoriteIcon from "../CustomFavoriteIcon";

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
  const [likeCountState, setLikeCountState] = useState<number>(likeCount);

  useEffect(() => {
    setLiked(likes.includes(profile));
  }, [profile, likes]);

  const handleLike = async () => {
    console.log('request!')
    try {
      if (!liked) {
        await server.post(`/posts/${postId}/like`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLiked(true);
        setLikeCountState((prevState) => prevState + 1);
      } else {
        await server.post(`/posts/${postId}/unlike`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLiked(false);
        setLikeCountState((prevState) => prevState - 1);
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
      <CustomFavoriteIcon
        handleLike={handleLike}
        liked={liked}
        likeCount={likeCountState}
      />
    </div>
  );
};

export default CustomActionIcon;
