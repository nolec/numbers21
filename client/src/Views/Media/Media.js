import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { mediaMedia } from "../../Actions/media";
import PressMedia from "../../Components/PressMedia";
import { device } from "../../device";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
  ${device.PC767`    padding: 0 0 60px 0;
    margin-top: 60px;`}
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
const SeeMore = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 90px;
`;
const SLink = styled(Link)`
  display: inline-block;
  padding: 10px 30px;
  background: #393939;
  color: #fff;
  font-size: 22px;
`;
export default () => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const { media, cnt } = useSelector(state => ({
    media: state.media.media[0],
    cnt:
      state.media.media[1] &&
      state.media.media[1].length > 0 &&
      state.media.media[1][0].total_row_count
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };
  console.log(media, cnt);
  useEffect(() => {
    dispatch(mediaMedia(currentPage));
  }, [currentPage, dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Media</h2>
        </HBox>
        <PressMedia item={media} />
        <SeeMore>
          {media && media.length === cnt ? null : (
            <SLink to="#" onClick={handleClick}>
              {lang.seeMore}
            </SLink>
          )}
        </SeeMore>
      </Container>
    </Section>
  );
};
