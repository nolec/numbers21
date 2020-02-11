import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
// import { isEmail, isValidation } from "./Auth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  TextField,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Button
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { mailPost } from "../../Actions/mail";
import { Link } from "react-router-dom";
import { device, minDevice } from "../../device";
import { LangContext } from "../../Context";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
const HBox = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 45px;
  font-size: 40px;
  color: #000;
  transition: all 0.1s, color 0.1s 0.1s;
  border-bottom: 1px #cacaca dotted;
  padding-bottom: 20px;
  margin-bottom: 80px;
`;
const ContactBox = styled.div`
  width: 100%;
  display: flex;
  color: #000;
  font-size: 22px;
`;
const Left = styled.div`
  width: 500px;
  padding-top: 60px;
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: 15px;
  padding-left: 15px;
  ${device.PC900`width : 100%;`}
`;
const Right = styled.div`
  text-align: right;
  ${device.PC900`display : none;`}
`;
const Img = styled.img.attrs(props => ({ src: props.theme.file.contactBg }))`
  width: 100%;
  height: auto;
`;
const ContactFooter = styled.div`
  display: flex;
  flex-direction: column;
`;
const FooterTitle = styled.div`
  p {
    color: #000;
    font-size: 30px;
    margin-bottom: 1rem;
  }
`;
const InquiryBox = styled.div`
  margin-top: 20px;
  color: #000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 30px;
`;
const Inquiry = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 30px;
  padding-right: 15px;
  padding-left: 15px;
  ${minDevice.minPC576`    flex: 0 0 50%;max-width: 50%;`}
  ${minDevice.minPC768`    flex: 0 0 33.3333%;max-width: 33.33333%;`}
`;
const Slink = styled(Link)`
  div {
    padding: 20px 20px;
    border: ${props =>
      props.active === "true" ? "none" : "1px solid #000000"};
    background-color: ${props =>
      props.active === "true" ? "#000000" : "#ffffff"};
    font-size: 20px;
    color: ${props => (props.active === "true" ? "#fff" : "#000")};
    transition: 0.3s linear;
    ${device.PC`padding : 10px 10px; font-size : 18px`}
    ${device.PC580`font-size: 16px;`}
    &:hover {
      border: none;
      color: #fff;
      background-color: #000;
    }
  }
  &.active div {
    background-color: red;
  }
`;
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&:not(.Mui-focused):not(.Mui-error):hover fieldset": {
        borderColor: "#000"
      }
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  field: {
    marginBottom: theme.spacing(5),
    "& *": { color: "#000", borderColor: "#000" }
  },
  submit: {
    padding: "10px 30px",
    background: "#393939",
    color: "#fff",
    border: "none",
    fontSize: "20px",
    marginTop: "30px",
    alignSelf: "center"
  },
  recaptcha: { display: "flex", justifyContent: "center" }
}));
const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});
let ContactSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("이름을 입력해 주세요"),
  email: yup
    .string()
    .email("유효하지 않은 이메일 입니다")
    .required("이메일 주소를 입력해 주세요"),
  message: yup
    .string()
    .min(10, "최소 10자 이상 입력해 주세요")
    .max(100, "최대 100자 이하로 입력해 주세요")
    .required("메시지를 입력해 주세요")
});
export default () => {
  const classes = useStyles();
  const recaptchaRef = useRef(null);
  const inquiry = useRef(null);
  const dispatch = useDispatch();

  //--------------------------------------------
  const [active, setActive] = useState({
    contact: true,
    biz: false,
    developers: false
  });
  const [mailId, setMailId] = useState(0);
  const activeChange = e => {
    e.preventDefault();
    let current = e.currentTarget.hash.substring(1);
    setActive({ contact: false, biz: false, developers: false });
    setActive({ [current]: true });
    if (current === "contact") setMailId(0);
    if (current === "biz") setMailId(1);
    if (current === "developers") setMailId(2);
    // console.log(
    //   Array.prototype.slice
    //     .call(inquiry.current.children)
    //     .filter(item => item === e.currentTarget),
    //   e.currentTarget,
    //   "작동"
    // );
    // Array.prototype.slice
    //   .call(inquiry.current.children)
    //   .map(item => (item.children[0] === e.currentTarget ? "" : ""));
  };
  const mailConfirm = values => {
    if (mailId === 0) values.id = 0;
    if (mailId === 1) values.id = 1;
    if (mailId === 2) values.id = 2;
  };
  //--------------------------------------------
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Contact Us</h2>
        </HBox>

        <Formik
          initialValues={{
            id: mailId,
            name: "",
            email: "",
            message: ""
          }}
          validationSchema={ContactSchema}
          onSubmit={values => {
            mailConfirm(values);
            setTimeout(() => {
              dispatch(mailPost(values));
            }, 1000);
          }}
        >
          {({ errors, handleChange, touched }) => (
            <ThemeProvider theme={theme}>
              <Form className={classes.form + " " + classes.root}>
                <ContactBox>
                  <Left>
                    <TextField
                      className={classes.field}
                      error={errors.name && touched.name}
                      onChange={handleChange}
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      id="name"
                      label={lang.contact01}
                      autoFocus
                      helperText={
                        errors.name && touched.name ? errors.name : null
                      }
                    />
                    <TextField
                      className={classes.field}
                      error={errors.email && touched.email}
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      id="email"
                      label={lang.contact02}
                      name="email"
                      autoComplete="email"
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                    />
                    <TextField
                      className={classes.field}
                      error={errors.message && touched.message}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows="3"
                      onChange={handleChange}
                      id="message"
                      label={lang.contact03}
                      name="message"
                      autoComplete="message"
                      helperText={
                        errors.message && touched.message
                          ? errors.message
                          : null
                      }
                    />
                  </Left>
                  <Right>
                    <Img />
                  </Right>
                </ContactBox>
                <ContactFooter>
                  <FooterTitle>
                    <p>{lang.contact04}</p>
                  </FooterTitle>
                  <InquiryBox ref={inquiry}>
                    <Inquiry>
                      <Slink
                        onClick={activeChange}
                        to="#contact"
                        active={active.contact ? "true" : "false"}
                      >
                        <div>
                          {lang.contact05}
                          <br />
                          contact@numbers21.com
                        </div>
                      </Slink>
                    </Inquiry>
                    <Inquiry>
                      <Slink
                        onClick={activeChange}
                        to="#biz"
                        active={active.biz ? "true" : "false"}
                      >
                        <div>
                          {lang.contact06}
                          <br />
                          biz@numbers21.com
                        </div>
                      </Slink>
                    </Inquiry>
                    <Inquiry>
                      <Slink
                        onClick={activeChange}
                        to="#developers"
                        active={active.developers ? "true" : "false"}
                      >
                        <div>
                          {lang.contact07}
                          <br />
                          developers@numbers21.com
                        </div>
                      </Slink>
                    </Inquiry>
                  </InquiryBox>
                  <ReCAPTCHA
                    className={classes.recaptcha}
                    ref={recaptchaRef}
                    sitekey="Your client site key"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {lang.contact08 !== undefined && lang.contact08}
                  </Button>
                </ContactFooter>
              </Form>
            </ThemeProvider>
          )}
        </Formik>
      </Container>
    </Section>
  );
};
