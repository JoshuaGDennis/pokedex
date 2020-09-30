import { iTheme } from "theme/Theme";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { colors } from "theme";

const StyledButton = styled(Button)`
  ${({
    theme,
    color,
  }: {
    theme: iTheme;
    color: keyof typeof colors.standard;
  }) => {
    const mainColor = color
      ? theme.colors.standard[color]
      : theme.colors.standard.blue;

    return `
        &.btn-primary {
            margin: 1em;
            border-radius: 5px;
            background-color: ${mainColor};
            border-color: ${mainColor};
            box-shadow: 0 0 8px ${mainColor};
        }

        &.btn-primary:focus {
            box-shadow: 0 0 8px ${mainColor};
        }
    `;
  }}
`;

export { StyledButton };
