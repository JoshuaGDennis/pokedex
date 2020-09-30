import reset from "react-style-reset/string";
import { iTheme } from "./Theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    ${reset};

    ${({ theme }: { theme: iTheme }) => `
        body {
            background-color: ${theme.background.primary};
            transition: ${theme.transition};
        }

        h1,h2,h3,h4,h5,p,span,a {
            color: ${theme.text};
            transition: ${theme.transition};
        }
    `}
`;

export default GlobalStyles;
