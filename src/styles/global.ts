import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import background from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

   //Padrão HTML font-size:16px == 1rem;
    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; // equivale a 15px;
        }

        @media (max-width: 720px) {
            font-size: 87.5%; // equivale a 14px;
        }
    }

    body {
       background: #f0f0f5 url(${background}) no-repeat 70% top;
       -webkit-font-smooth: antialiased;
    }

    body, input, text-area, select, button {
        font: 400 1rem "Roboto" , sans-serif;
    }

    #root {
       max-width: 960px;
       margin: 0 auto;
       padding: 2.5rem 1.25rem;
    }

    button {
       cursor: pointer;
    }

    a {
       color: inherit;
       text-decoration: none;
    }
    
    
`;

export const LogoStyle = styled.img`
    width: 10vw;
`;