import React from "react";
import { iTheme } from "theme";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const StyledCard = styled(Card)`
  ${({ theme }: { theme: iTheme }) => `
    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    .card-img {
      width: 8rem;
      height: 8rem;
    }

    background-color: ${theme.card};
  `}
`;

const PokemonID = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-weight: bold;
`;

const TypePill = styled.span`
  ${({ color }) => `
    background-color: ${color};
    padding: 0.2rem;
    border-radius: 2px;
    display: inline-block;
    width: 4rem;
    height: 2rem;
    text-align: center;
    line-height: 1.5rem;
    margin-right: 1rem;
    color: #fff;
    box-shadow: 0 0 2px ${color};
  `}
`;

const Ability = styled(Col)`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

const Weakness = styled(({ colors, ...rest }) => <span {...rest} />)`
  ${({
    theme,
    colors,
  }: {
    theme: iTheme;
    colors: { primary: string; secondary: string };
  }) => `
    position: relative;
    padding: 0.5rem;
    background-color: ${theme.id === "LIGHT" ? colors.primary : "transparent"};
    border-radius: 5px;
    display: inline-block;
    min-width: 5rem;
    color: #fff;
    margin-right: 1rem;

    ${
      theme.id === "DARK"
        ? `
      border: 2px solid ${colors.primary};
    `
        : ""
    }

    &::after {
      content: 'x2';
      background-color: ${
        theme.id === "LIGHT" ? colors.secondary : "transparent"
      };
      position: absolute;
      right: 0;
      top: 0;
      padding: 0.5rem 0px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 1.5rem;
      text-align: center;
      color: ${theme.id === "DARK" ? colors.secondary : "#fff"};
  `}
`;

export { StyledCard, PokemonID, TypePill, Ability, Weakness };
