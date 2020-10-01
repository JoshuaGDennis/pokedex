import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = styled(BootstrapCard)`
  width: 10rem;
  margin: 1rem;
`;

const Link = styled(ReactLink)`
  &:hover {
    text-decoration: none;
    color: none;
  }
`;

export { Card, Link };
