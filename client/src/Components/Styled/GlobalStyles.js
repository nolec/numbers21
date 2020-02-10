import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    @font-face {
        font-family: "notopen_numbers";
        src: url(${props => props.theme.file.fontFamily});
    }
    
*,::before,::after{
    box-sizing : border-box;
}
body {
    width: 100%;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    font-family: 'notopen_numbers', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    word-break: break-word;
    color: #000;
    text-align: left;
    background-color: #fff;
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-bottom: .5rem;
    font-family: inherit;
    line-height: 1.2;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #000;
}
h1{
    font-size: 2.5rem;
}
p {
    line-height: 1.75;
    font-size: 20px;    
    margin-top: 0;
    margin-bottom: 1rem;
}
a{
    display : block;
    text-decoration: none;
    background-color: transparent;
    color : #000;
    transition: all 0.3s ease-out;
}
ul,li {
    margin-top: 0;
    margin-bottom: 1rem;
    list-style : none;
}
`;

export default globalStyles;
