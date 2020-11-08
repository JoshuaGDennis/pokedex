import React from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

type props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: React.FC<props> = (props) => <Button {...props} />;

CustomButton.defaultProps = {
  size: "sm",
  variant: "primary",
};

export default CustomButton;
