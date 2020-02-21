import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { device, minDevice } from "../../device";
import { LangContext } from "../../Context";
import { Link } from "react-router-dom";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
  ${device.PC767`    padding: 0 0 60px 0;
    `}
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
  ${device.PC768`margin-bottom: 20px;font-size : 28px;`}
`;
const Sitemap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ItemBox = styled.div`
  padding: 0 0 30px 130px;
  margin-bottom: 20px;
  ${minDevice.minPC768`flex: 0 0 25%;max-width: 25%;`}
  ${device.PC1000`padding: 0 0 90px 80px;`}
  ${device.PC767`flex: 0 0 50%;max-width: 50%;`}
  h4 {
    font-size: 1.5rem;
    margin-left: -45px;
    padding-bottom: 10px;
  }
`;
const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;
const Li = styled.li`
  padding: 5px 0;
  list-style-type: disc;
  margin: 0;
`;
const Item = styled(Link)`
  color: #000;
  opacity: 0.8;
  font-size: 18px;
  &:hover {
    color: #a6a6a6;
    opacity: 1;
  }
`;
export default () => {
  const { lang } = useContext(LangContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Sitemap</h2>
        </HBox>
        <Sitemap>
          {lang.sitemap &&
            lang.sitemap.map((site, i) => (
              <ItemBox key={i}>
                <h4>{site.site}</h4>
                <Ul>
                  {site.name.map((a, key) => (
                    <Li key={key}>
                      <Item to={`/${a[0]}`}>{a[1]}</Item>
                    </Li>
                  ))}
                </Ul>
              </ItemBox>
            ))}
        </Sitemap>
      </Container>
    </Section>
  );
};
