import { useState, useEffect } from "react";
import io from "socket.io-client";
import { AppBar, Toolbar, Typography, Box, Badge } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import CustomIconButton from "../CustomIconButton";
import { SERVER_ADRESS } from "../../constants";

interface Props {
  title: string;
}

const CustomAppBar = ({ title }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [messageCount, setMessageCount] = useState(0);

  const socket = io(SERVER_ADRESS, {
    auth: { token },
  });

  useEffect(() => {
    socket.on("connected", () => {
      console.log(socket);
    });

    socket.on("connected_profile", (profile) => {
      console.log(profile);
    });

    socket.on("disconnected", () => {
      console.log(socket);
    });

    socket.on("post", (data) => {
      console.log(data);
      setMessageCount((count) => count + 1);
    });

    socket.on("post-like", (data) => {
      console.log(data);
      setMessageCount((count) => count + 1);
    });

    socket.on("comment", (data) => {
      console.log(data);
      setMessageCount((count) => count + 1);
    });

    socket.on("comment-like", (data) => {
      console.log(data);
      setMessageCount((count) => count + 1);
    });

    socket.on("connect_error", (err) => {
      console.error(err);
    });

    return () => {
      socket.off();
    };
  }, [token, socket]);

  const handleClickEmail = () => {
    if (messageCount) {
      setMessageCount(0);
      window.location.reload();
    }
  };

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
          <CustomIconButton
            label="show home"
            onClickCallBack={() => navigate("/home")}
          >
            <HomeIcon />
          </CustomIconButton>
          <CustomIconButton
            label="notifications"
            onClickCallBack={handleClickEmail}
          >
            <Badge badgeContent={messageCount} color="secondary">
              <EmailIcon />
            </Badge>
          </CustomIconButton>
          <CustomIconButton
            label="show edit"
            onClickCallBack={() => {
              navigate("/create");
            }}
          >
            <EditIcon />
          </CustomIconButton>
          <CustomIconButton
            label="show profiles"
            onClickCallBack={() => navigate("/profiles")}
          >
            <GroupIcon />
          </CustomIconButton>
          <CustomIconButton
            label="show profile"
            onClickCallBack={() => navigate("/profile")}
          >
            <AccountCircleIcon />
          </CustomIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
