import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        // --gray: #1e2124;
        // --pink: #fb6f92;
        // --very-light-purple: #fbd0ff;
        // --light-purple: #c19af2;
        // --purple: #8a66b9;
        --white: #fff;
        --black: #000;
        --purple: #7229e0;
        --light-purple: #9d88b2;
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
        background: white;
        color: black;
        font-family: "Poppins", serif;
        min-width: 375px;
        min-height: 100vh;
        @media(max-width: 375px){
            min-height: 118vh;
        }
    }
`