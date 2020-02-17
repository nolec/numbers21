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
import careersBg from "../../assets/images/careers/Bg_Careers_1.png";
import Diversity from "../../assets/images/careers/Icon_Diversity.png";
import Collaboration from "../../assets/images/careers/Icon_Collaboration.png";
import Innovation from "../../assets/images/careers/Icon_Innovation.png";
import Travel from "../../assets/images/careers/Icon_Travel.png";
import Enjoy from "../../assets/images/careers/Icon_Health.png";
import Take from "../../assets/images/careers/Icon_Take.png";
import careersBg2 from "../../assets/images/careers/Bg_Careers_2.png";
import Talented from "../../assets/images/careers/Icon_Talented.png";
import International from "../../assets/images/careers/Icon_International.png";
import Versatile from "../../assets/images/careers/Icon_Versatile.png";
import Creative from "../../assets/images/careers/Icon_Creative.png";
import contactBg from "../../assets/images/Bg_Contact.jpg";
import save from "../../assets/images/icon/save-24px.svg";

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
const SlinkStyle = () => css`
  display: inline-block;
  padding: 10px 40px;
  background: #000;
  color: #fff;
  font-size: 18px;
  :hover {
    background: #fff;
    color: #000;
    border: 1px solid;
  }
`;
const theme = {
  css: { black: "#000" },
  styles: {
    SectionStyle,
    ContainerStyle,
    SlinkStyle
  },
  file: {
    fontFamily,
    bg,
    logo,
    photo,
    careersBg,
    careersBg2,
    contactBg,
    footerLogo,
    save
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
export const culutre = [
  { img: Diversity, h4: ko.culture02, p: ko.culture03 },
  { img: Collaboration, h4: ko.culture04, p: ko.culture05 },
  { img: Innovation, h4: ko.culture06, p: ko.culture07 }
];
export const benefits = [
  { img: Travel, h4: ko.culture09, p: ko.culture10 },
  { img: Enjoy, h4: ko.culture11, p: ko.culture12 },
  { img: Take, h4: ko.culture13, p: ko.culture14 }
];
export const values = [
  { img: Talented, h4: ko.culture16, p: ko.culture17 },
  { img: International, h4: ko.culture18, p: ko.culture19 },
  { img: Versatile, h4: ko.culture20, p: ko.culture21 },
  { img: Creative, h4: ko.culture22, p: ko.culture23 }
];
export default theme;
