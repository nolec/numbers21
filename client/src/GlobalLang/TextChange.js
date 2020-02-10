import React from "react";
import styled from "styled-components";

const Tag = styled.data``;

export const textFunc = text => {
  let newText = text.split("\n").map((item, i) => {
    return (
      <Tag key={i}>
        {item}
        {text.length === i + 1 ? null : <br />}
      </Tag>
    );
  });
  return newText;
};
