import React from "react";
import styled from "styled-components";

const StatContainer = styled(({ colors, name, value, ...rest }) => (
  <div className="stat-container" {...rest} />
))`
  ${({ colors, name, value }) => {
    const animationName = `stat-${name.replace(" ", "-")}`;

    return `
      @keyframes ${animationName} {
          from { width: 0px; }
          to { width: ${value}px; }
      }

      .stat-value {
          width: 100px;
          height: 0.8rem;
          display: inline-block;
          background-color: ${colors.secondary};
          border-radius: 1rem;

          &::before {
              display: block;
              content: "";
              width: ${value}px;
              height: 0.8rem;
              background-color: ${colors.primary};
              border-radius: 1rem;
              animation-name: ${animationName};
              animation-duration: 1s;
          }
      }
  `;
  }}
`;

export { StatContainer };
