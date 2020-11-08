import React from "react";
import "./HomePage.scss";
import Page from "components/Page";
import Card from "components/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage: React.FC = () => (
  <Page>
    <h1>The Pokedex App</h1>

    <Row className="row-generations">
      {Array.from(Array(8).keys()).map((i) => (
        <Col key={i}>
          <Card className="gen-card">
            <Row>
              <Col className="gen-card-circles">
                <div className="circle" />
                <div className="circle" />
              </Col>
              <Col xs={8} className="gen-card-detail">
                <h2>Generation I</h2>
                <p>Kanto Region</p>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  </Page>
);

export default HomePage;
