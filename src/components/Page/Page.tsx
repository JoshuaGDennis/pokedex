import React from "react";
import "./Page.scss";
import Container from "react-bootstrap/Container";

interface iPageProps {
  children: React.ReactNode;
}

const Page: React.FC<iPageProps> = ({ children }) => (
  <Container className="page">{children}</Container>
);

export default Page;
