import React from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const StyledSpinner = styled(Spinner)`
  ${({ theme }) => `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-color: ${theme.id === "LIGHT" ? "#000" : "#fff"};
        border-right-color: transparent;
    `}
`;

const CustomSpinner = () => <StyledSpinner animation="border" />;

export default CustomSpinner;
