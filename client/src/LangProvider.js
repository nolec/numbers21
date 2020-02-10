import React, { useState } from "react";
import { ko } from "./GlobalLang/Korean";
import { en } from "./GlobalLang/English";
import { LangContext } from "./Context";

const LangProvider = ({ children }) => {
  const [korean, setKorean] = useState(true);
  const [lang, setLang] = useState({});
  const languageSetting = () => {
    if (korean) {
      setLang(ko);
    } else {
      setLang(en);
    }
  };

  const handleKor = e => {
    if (korean) {
      e.preventDefault();
    } else {
      window.scrollTo(0, 0);
      setKorean(true);
    }
  };
  const handleEng = e => {
    if (!korean) {
      e.preventDefault();
    } else {
      window.scrollTo(0, 0);
      setKorean(false);
    }
  };
  const provider = {
    languageSetting,
    handleKor,
    handleEng,
    lang,
    korean
  };
  return (
    <LangContext.Provider value={provider}>{children}</LangContext.Provider>
  );
};

export default LangProvider;
