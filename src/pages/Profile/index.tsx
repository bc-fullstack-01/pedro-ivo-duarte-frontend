import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomAppBar from "../../components/CustomAppBar";

const Profile = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <CustomAppBar title="Perfil" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>{name}</h1>
        <Button variant="contained" onClick={handleLogout}>
          Sair
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
