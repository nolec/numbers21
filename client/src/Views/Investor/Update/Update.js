import React, { useEffect } from "react";
import styled from "styled-components";
import Write from "../Write";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default () => {
  const { detail } = useSelector(state => ({ detail: state.board.detail }));
  if (detail === null || !detail) {
    return <Redirect to="/investor" />;
  }
  return <Write update={true} />;
};
