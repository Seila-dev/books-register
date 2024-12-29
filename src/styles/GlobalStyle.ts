import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --gray: #1e2124;
        --pink: #fb6f92;
        --very-light-purple: #fbd0ff;
        --light-purple: #c19af2;
        --purple: #8a66b9;
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

    button, input{
        font-family: "Poppins", serif;
    }
    
    body{
        background: #fff;
        color: black;
        font-family: "Poppins", serif;
        min-width: 375px;
    }
`