import { css } from "styled-components";
import fontFamily from "../../assets/fonts/notopen_numbers.ttf";

const SectionStyle = () => css`
  padding: 80px 0px 120px;
  display: block;
`;

const theme = {
  css: { black: "#000" },
  styles: {
    SectionStyle
  },
  file: {
    fontFamily
  }
};

export default theme;
