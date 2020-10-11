import { iTheme } from "theme";
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

export { StyledCard, PokemonID, TypePill };
