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
  sortItems?(a: any, b: any): number;
}

const List: React.FC<iListProps> = ({
  isLoading,
  loadingMessage,
  renderItem,
  sortItems,
  items,
}) => {
  if (items === undefined || !items.length) return <Loader isLoading />;

  const sortedItems = sortItems ? items.sort(sortItems) : items;

  return (
    <Loader isLoading={isLoading} message={loadingMessage}>
      <Row className="list">
        {sortedItems.map((item, i) => (
          <Col key={i} md="4">
            {renderItem(item, i)}
          </Col>
        ))}
      </Row>
    </Loader>
  );
};

export default List;
