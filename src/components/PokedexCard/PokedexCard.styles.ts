import { colors } from "theme";
import { iTheme } from "theme/Theme";
import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = styled(BootstrapCard)`
  ${({ theme }: { theme: iTheme }) => `
    width: 14rem;
    margin: 1rem;

    & .card-img {
      display: block;
      max-width: 8rem;
      max-height: 8rem;
      margin: 0 auto;
    }

    & .card-title {
      color: ${theme.text};
    }

    & .card-body {
      padding-top: 0;
    }

    background-color: ${theme.card};
  `}
`;

const CardID = styled.p`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

const CardPill = styled.span`
  ${({ theme }: { theme: iTheme }) => `
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
        background-color: ${colors.purple};
      `
        : `
        background-color: ${theme.background.secondary};
        border-color: ${colors.purple};
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
