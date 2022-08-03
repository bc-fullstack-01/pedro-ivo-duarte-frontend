import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import {
  Home as HomeIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import CustomIconButton from "../CustomIconButton";

interface Props {
  title: string;
}

const CustomAppBar = ({ title }: Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <CustomIconButton label="show home" onClickCallBack={() => {}}>
            <HomeIcon />
          </CustomIconButton>
          <CustomIconButton label="show edit" onClickCallBack={() => {}}>
            <EditIcon />
          </CustomIconButton>
          <CustomIconButton label="show profiles" onClickCallBack={() => {}}>
            <GroupIcon />
          </CustomIconButton>
          <CustomIconButton label="show profile" onClickCallBack={() => {}}>
            <AccountCircleIcon />
          </CustomIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
