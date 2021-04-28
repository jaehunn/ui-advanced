import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        font-family: 'Open Sans';
        font-weight: 300;
        background-color: ${({ theme }) => theme.bodyBgColor}; // #fff <-> #232323
    }
`;

export default GlobalStyle;
