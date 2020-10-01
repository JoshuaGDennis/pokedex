import { iTheme } from "theme";
import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = styled(BootstrapCard)`
  ${({ color, theme }: { color: string; theme: iTheme }) => `
    width: 14rem;
    height: 14rem;
    margin: 1rem;

    & .card-img {
      display: block;
      max-width: 8rem;
      max-height: 8rem;
      margin: 0 auto;
    }

    & .card-title {
      color: #fff;
    }

    & .card-body {
      padding-top: 0;
    }

    & .spinner-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-color: ${theme.id === "LIGHT" ? "#000" : "#fff"};
      border-right-color: transparent;
    }

    background-color: ${theme.id === "LIGHT" ? color : theme.card};
  `}
`;

const CardID = styled.p`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  color: #fff;
`;

const CardPill = styled.span`
  ${({ color, theme }: { color: string; theme: iTheme }) => `
    padding: 0.5rem;
    color: #fff;
    border-radius: 1em;
    width: 4.5rem;
    display: inline-block;
    margin-right: 1rem;
    text-align: center;
    transition: 0.2s all ease;
    border: 2px solid transparent;

    ${
      theme.id === "LIGHT"
        ? `
        background-color: ${color};
      `
        : `
        background-color: ${theme.background.secondary};
        border-color: ${color};
      `
    }
  `}}
`;

const Link = styled(ReactLink)`
  &:hover {
    text-decoration: none;
    color: none;
  }
`;

export { Card, CardID, CardPill, Link };
