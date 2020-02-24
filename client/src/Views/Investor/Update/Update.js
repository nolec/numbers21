import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Summer from "../Summer";

const Update = styled.div``;

export default ({ match, history }) => {
  const { detail } = useSelector(state => ({
    detail: state.board.detail
  }));
  const {
    params: { type, list }
  } = match;
  const update = {
    update: true,
    type: type,
    history: history,
    list: list
  };

  if (detail === null || !detail) {
    return <Redirect to="/investor" />;
  }
  return (
    <Update>
      <Summer update={update} type={type} />
    </Update>
  );
};
