import { ReactElement } from "react";
import { IconButton } from "@mui/material";

interface Props {
  children: ReactElement;
  label: string;
  onClickCallBack: any;
}

const CustomIconButton = ({ children, label, onClickCallBack }: Props) => {
  return (
    <IconButton
      size="large"
      arial-lavel={label}
      color="inherit"
      onClick={() => onClickCallBack}
    >
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
