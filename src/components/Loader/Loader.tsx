import React from "react";
import "./Loader.scss";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

interface iLoaderProps {
  isLoading?: boolean;
  message?: string;
  children?: React.ReactNode;
}

const Loader: React.FC<iLoaderProps> = ({
  isLoading,
  message,
  children,
}: iLoaderProps) => {
  if (isLoading) {
    return (
      <Container className="loader">
        {message && <h2>{message}</h2>}
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return <>{children}</>;
};

export default Loader;
