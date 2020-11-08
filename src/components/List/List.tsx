import "./List.scss";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "components/Loader";

interface iListProps {
  isLoading?: boolean;
  loadingMessage?: string;
  items: any[] | undefined;
  renderItem(item: any, i: number): React.ReactNode;
}

const List: React.FC<iListProps> = ({
  isLoading,
  loadingMessage,
  items,
  renderItem,
}) => {
  if (items === undefined || !items.length) return <Loader isLoading />;

  return (
    <Loader isLoading={isLoading} message={loadingMessage}>
      <Row className="list">
        {items.map((item, i) => (
          <Col key={i} md="4">
            {renderItem(item, i)}
          </Col>
        ))}
      </Row>
    </Loader>
  );
};

export default List;
