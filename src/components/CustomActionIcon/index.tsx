import { useState, useEffect } from "react";
import server from "../../api/server";

import CustomFavoriteIcon from "../CustomFavoriteIcon";
import CustomChatBubbleIcon from "../CustomChatBubbleIcon";

interface Props {
  likes: string[];
  commentCount: number;
  likeCount: number;
  postId: string;
}

const CustomActionIcon = ({
  commentCount,
  likeCount,
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
    console.log("request!");
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
      <CustomChatBubbleIcon commentCount={commentCount} />
      <CustomFavoriteIcon
        handleLike={handleLike}
        liked={liked}
        likeCount={likeCountState}
      />
    </div>
  );
};

export default CustomActionIcon;
