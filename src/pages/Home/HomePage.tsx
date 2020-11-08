import "./HomePage.scss";
import Page from "components/Page";
import Card from "components/Card";
import List from "components/List";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GenerationResource } from "helpers/types";
import { capitalise, formatGeneration } from "helpers/strings";
import { getGeneration, getGenerationList } from "helpers/api";

const HomePage: React.FC = () => {
  const { data } = useQuery("generationList", getGenerationList);
  const [generations, setGenerations] = useState<GenerationResource[]>([]);

  useEffect(() => {
    if (data) {
      Promise.all(data.results.map((g) => getGeneration(g.name))).then(
        setGenerations
      );
    }
  }, [data]);

  return (
    <Page>
      <h1>The Pokedex App</h1>

      <List
        isLoading={!generations.length}
        items={generations}
        renderItem={(item: GenerationResource, i) => (
          <Card className="gen-card">
            <Link
              to={{
                pathname: `/pokedex/gen${i + 1}`,
                state: item,
              }}
            >
              <Row>
                <Col
                  className={`gen-card-circles gen-${item.name.split("-")[1]}`}
                >
                  <div className="circle" />
                  <div className="circle" />
                </Col>
                <Col xs={8} className="gen-card-detail">
                  <h2>{formatGeneration(item.name)}</h2>
                  <p>{capitalise(item.main_region.name)} Region</p>
                </Col>
              </Row>
            </Link>
          </Card>
        )}
      />
    </Page>
  );
};

export default HomePage;
