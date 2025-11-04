import { createGlobalStyles } from "solid-styled-components";

export const PageStyle = createGlobalStyles`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height:100%;
        width: 100%;
        position:relative;
    }

    body {
        background-color: var(--page-color);
        color: var(--text-color);
    }
    
`;
