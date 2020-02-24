import React from "react";
import styled from "styled-components";
import Summer from "../Summer";

const Write = styled.div``;

export default ({ type, history }) => {
  const write = {
    write: true,
    type: type,
    history: history
  };
  console.log(type);
  return (
    <Write>
      <Summer write={write} />
    </Write>
  );
};
