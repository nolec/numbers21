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
`;

export default globalStyles;
