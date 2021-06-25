import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;
