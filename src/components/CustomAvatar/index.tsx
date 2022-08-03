import { Avatar } from "@mui/material";

const CustomAvatar = ({ profileName, postTitle }: { profileName: string, postTitle: string }) => {
  let displayInicials;
  if (profileName.split(" ")[1]) {
    displayInicials = profileName
      .split(" ")
      .reduce((acc, string) => acc + string.charAt(0), "");
  } else {
    displayInicials = profileName.slice(0, 2);
  }
  return <Avatar title={postTitle}>{displayInicials}</Avatar>;
};

export default CustomAvatar;
