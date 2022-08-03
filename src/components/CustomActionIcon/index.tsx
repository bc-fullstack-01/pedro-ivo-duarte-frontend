import { Typography, IconButton } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

interface Props {
  commentCount: number;
  likeCount: number
}

const CustomActionIcon = ({commentCount, likeCount}: Props) => {
  return (
    <div>
      <IconButton>
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
      <IconButton>
        <FavoriteBorderIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {likeCount}
      </Typography>
    </div>
  );
};

export default CustomActionIcon;
