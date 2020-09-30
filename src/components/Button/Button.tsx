import React from "react";
import { colors } from "theme";
import { ButtonProps } from "react-bootstrap";
import { StyledButton } from "./Button.styles";

interface iProps {
  color?: typeof colors;
}

const Button: React.FC<
  iProps & ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => (
  <StyledButton {...props} variant="primary">
    {props.children}
  </StyledButton>
);

Button.defaultProps = {
  size: "sm",
};

export default Button;
