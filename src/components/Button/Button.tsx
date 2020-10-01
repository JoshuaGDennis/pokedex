import React from "react";
import { colors } from "theme";
import { ButtonProps as ReactBtnProps } from "react-bootstrap";
import { StyledButton } from "./Button.styles";
import { Link } from "react-router-dom";

interface iProps {
  color?: typeof colors;
  to?: string | object;
}

type ButtonProps = iProps &
  ReactBtnProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  const comp = (
    <StyledButton {...props} variant="primary">
      {props.children}
    </StyledButton>
  );

  return props.to ? <Link to={props.to}>{comp}</Link> : comp;
};

Button.defaultProps = {
  size: "sm",
};

export default Button;
