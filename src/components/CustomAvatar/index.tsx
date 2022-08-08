import { Avatar } from "@mui/material";

const CustomAvatar = ({ profileName }: { profileName: string }) => {
  let displayInicials;
  if (!profileName) {
    return <Avatar sx={{backgroundColor: "gray"}} />
  }
  if (profileName.split(" ")[1]) {
    displayInicials = profileName
      .split(" ")
      .reduce((acc, string) => acc + string.charAt(0), "");
  } else {
    displayInicials = profileName.charAt(0);
  }
  return <Avatar sx={{backgroundColor: "red"}}>{displayInicials}</Avatar>;
};

export default CustomAvatar;
