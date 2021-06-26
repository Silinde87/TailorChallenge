import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100vh;
        font-family: sans-serif;            
    }

    #__next {
        display: flex;
        flex-flow: column;
    }
    h1,h2,h3,h4,h5,h6,p{
        margin: 0;
        padding: 0;
    } 

    * {
        box-sizing: border-box;
    }

    a{
        text-decoration: underline;
    }

    main {
        padding: 0;
        flex: 1;
        height: 100%;
        padding: 15px 2rem 30px 2rem;
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;
