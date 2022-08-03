import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import CustomIconButton from "../CustomIconButton";

const CustomAppBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Home
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <CustomIconButton label="show home" onClickCallBack={() => {}}>
            <HomeIcon />
          </CustomIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
