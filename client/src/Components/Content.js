import React from "react";
import styled from "styled-components";
const ContentBox = styled.div`
  display: flex;
`;
const Content = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  ${props =>
    props.count === 4
      ? "flex : 0 0 25%;max-width : 25%;"
      : "flex: 0 0 33.333333%;max-width: 33.333333%;"}
  h4,p {
    ${props => (props.count === 4 ? "color : #fff;" : "color : #000;")}
  }
`;
const Div = styled.div`
  h4 {
    font-size: 1.5rem;
    padding: 20px 0 10px;
  }
`;
const Img = styled.img``;

export default ({ repeatItem }) => {
  return (
    <ContentBox>
      {repeatItem.map((item, i) => (
        <Content key={i} count={repeatItem.length}>
          <Div>
            <Img src={item.img} />
            <h4>{item.h4}</h4>
          </Div>
          <p>{item.p}</p>
        </Content>
      ))}
    </ContentBox>
  );
};
