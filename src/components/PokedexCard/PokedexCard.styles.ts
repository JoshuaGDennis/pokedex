import styled from "styled-components";
import { Card as BootstrapCard } from "react-bootstrap";
import { iTheme } from "theme/Theme";

const Card = styled(BootstrapCard)`
  ${({ theme }: { theme: iTheme }) => `
    width: 15rem;
    margin: 1rem;

    & .card-img {
      max-width: 8rem;
      max-height: 8rem;
      margin: 0 auto;
    }

    & .card-title {
      color: ${theme.text};
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

const CardPill = styled.span``;

export { Card, CardID, CardPill };
