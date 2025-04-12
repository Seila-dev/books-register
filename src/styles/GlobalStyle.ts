import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --white: #fff;
        --black: #000;
        --secondary: #7229e0;
        --tertiary: #9d88b2;
        --almost-white: #fef7ff;
        --almost-black: #1f1926;

    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }
    
    ul, li{
        list-style: none;
    }

    a{
        color: black;
    }

    button, input, textarea{
        font-family: "Poppins", serif;
    }
    
    body{
        font-family: "Lato", Helvetica Neue, helvetica, sans-serif;
        background: linear-gradient(to right top, #000, #00043a);
        max-width: 100vw;
        min-height: 100vh;
    }
`