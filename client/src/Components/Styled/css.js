import { css } from "styled-components";
import fontFamily from "../../assets/fonts/notopen_numbers.ttf";
import { ko } from "../../GlobalLang/Korean";
import bg from "../../assets/images/Bg_Topline.png";
import logo from "../../assets/images/Logo_Top.png";
import photo from "../../assets/images/Photo_Whatwedo.png";
import s1 from "../../assets/images/Solution_7Chain.png";
import s2 from "../../assets/images/Solution_7Chat.png";
import s3 from "../../assets/images/Solution_7Luck.png";
import footerLogo from "../../assets/images/Logo_Bot.png";

const SectionStyle = () => css`
  padding: 80px 0px 120px;
  display: block;
`;
const ContainerStyle = () => css`
  max-width: 1300px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
const theme = {
  css: { black: "#000" },
  styles: {
    SectionStyle,
    ContainerStyle
  },
  file: {
    fontFamily,
    bg,
    logo,
    photo,
    footerLogo
  }
};

export const repeat = [
  { solution: s1, h3: ko.chain, p: ko.solution05 },
  { solution: s2, h3: ko.chat, p: ko.solution06 },
  { solution: s3, h3: ko.luck, p: ko.solution07 }
];
export const repeatItem = [
  { h4: ko.footer01.about, sub: ko.footer01.sub },
  { h4: ko.footer02.solutions, sub: ko.footer02.sub },
  { h4: ko.footer03.contact, sub: ko.footer03.sub },
  { h4: ko.footer04.support, sub: ko.footer04.sub },
  { h4: ko.footer05.ir, sub: ko.footer05.sub }
];
export default theme;
