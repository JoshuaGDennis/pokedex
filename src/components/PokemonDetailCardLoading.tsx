import React from "react";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import styles from "styles/PokemonCard.module.scss";
import loadingStyles from "styles/PokemonCard.module.scss";
import { useTheme } from "helpers";

const PokemonDetailCardLoading: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      className={theme === "light" ? styles.cardSplit : styles.cardSplitDark}
    >
      <Card.Body>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link className={loadingStyles.skeleton} disabled>
              PROFILE
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={loadingStyles.skeleton} disabled>
              STATS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={loadingStyles.skeleton} disabled>
              EVOLUTIONS
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Body>
    </Card>
  );
};

export default PokemonDetailCardLoading;
