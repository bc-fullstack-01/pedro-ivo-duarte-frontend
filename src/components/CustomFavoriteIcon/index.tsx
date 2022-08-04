import { IconButton, Typography } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

interface Props {
  handleLike: any;
  liked: boolean;
  likeCount: number;
}

const CustomFavoriteIcon = ({ handleLike, liked, likeCount }: Props) => {
  return (
    <>
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
    </>
  );
};

export default CustomFavoriteIcon;
