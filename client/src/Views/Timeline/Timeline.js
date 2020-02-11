import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import { minDevice, device } from "../../device";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
const Title = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 45px;
  transition: all 0.1s, color 0.1s 0.1s;
  border-bottom: 1px #cacaca dotted;
  padding-bottom: 20px;
  margin-bottom: 80px;
  h2 {
    font-size: 40px;
    color: #000;
  }
`;
const TimeList = styled.div`
  margin-bottom: -1.5em;
`;
const Timeline = styled.ul`
  margin-bottom: 1rem;
  position: relative;
  padding: 0;
  list-style: none;
  height: 100%;
  ::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 26px;
    width: 2px;
    margin-left: -1.5px;
    content: "";
    background-color: #000000;
    ${minDevice.minPC768`left : 50%;`}
  }
  li {
    position: relative;
    margin-bottom: 0;
    display: flex;
    ::before {
      display: table;
      content: "";
    }
    ::after {
      clear: both;
      display: table;
      content: "";
    }
    ${device.PC767`padding : 1em 0 1em 0`}
    ${minDevice.minPC768`margin-bottom: 40px;`}
    h3 {
      position: relative;
      margin-right: 60px;
      font-size: 80px;
      color: #000000;
      margin-bottom: 0.5rem;
      ::before {
        display: block;
        content: "";
        position: absolute;
        top: 40px;
        left: 0;
        width: calc(100% - 120px);
        height: 1px;
        background: #777;
      }
    }
  }
  .timeline-panel {
    position: relative;
    width: 50%;
    text-align: left;
    padding-left: 0;
    ${minDevice.minPC768`float : left;`}
    &.year {
      display: none;
      ${minDevice.minPC768`display : block;`}
    }
    &.left {
      position: relative;
      float: left;
      width: 100%;
      text-align: left;
      padding-left: 55px;
      ${minDevice.minPC768` 
          float: left;
    width: 50%;
    padding-left: 0;
    display: block; 
    text-align: right;
    padding-right: 90px;`}
    }
    &.right {
      position: relative;
      float: left;
      width: 100%;
      text-align: left;
      padding-left: 55px;
      ${minDevice.minPC768` 
      width : 50%;
    display: block; 
    text-align: left;
    padding-left: 85px;`}
    }
    &.blank {
      display: none;
      ${minDevice.minPC768`display : block;`}
    }
    h4 {
      font-size: 23px;
      margin-bottom: 0;
      color: #000000;
      ${minDevice.minPC768`    margin-bottom: 10px; `}
      ${device.PC600`font-size : 18px;`}
    }
    p {
      font-size: 19px;
      ${device.PC1199`font-size : 15px;`}
      margin-bottom: 0;
      color: #000000;
      padding-top: 15px;
      ${device.PC600`font-size : 14px;`}
      &.sub-txt {
        font-weight: 300;
        opacity: 0.8;
        ${device.PC600`font-size : 13px;`}
        ${minDevice.minPC768`font-size: 18px;`}
      }
    }
  }
  .timeline-image {
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    z-index: 100;
    background-color: #000000;
    margin-left: 18px;
    ${minDevice.minPC768` 
    left: 50%;
    width: 32px;
    height: 32px;
    margin-left: -16px;`};
    ::after {
      ${minDevice.minPC768` 
      display: block;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      background: #ffffff;
      border-radius: 50%;`};
    }
    &.small {
      width: 16px;
      height: 16px;
      margin-left: 18px;
      font-size: 80%;
      font-weight: 400;
      ${minDevice.minPC768`margin-left: -9px;`}
      ::after {
        content: none;
      }
    }
  }
`;

export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <Title>
          <h2>{lang.timeline00}</h2>
        </Title>
        <TimeList>
          <Timeline>
            <li class="year-p">
              <div class="timeline-panel left year">
                <h3>19</h3>
              </div>
              <div class="timeline-panel right blank">&nbsp;</div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left year"></div>
              <div className="timeline-image"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline01}</h4>
                <p>{lang.timeline02}</p>
                <p>{lang.timeline03}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left">
                <h4>{lang.timeline04}</h4>
                <p>{lang.timeline05}</p>
              </div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right blank">&nbsp;</div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li class="year-p">
              <div class="timeline-panel left year">
                <h3>18</h3>
              </div>
              <div class="timeline-panel right blank">&nbsp;</div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left year"></div>
              <div className="timeline-image"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline06}</h4>
                <p>{lang.timeline07}</p>
                <p>{lang.timeline08}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left">
                <h4>{lang.timeline09}</h4>
                <p>{lang.timeline10}</p>
                <p>{lang.timeline11}</p>
              </div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right"></div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left"></div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline12}</h4>
                <p>{lang.timeline13}</p>
                <p>{lang.timeline14}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left">
                <h4>{lang.timeline15}</h4>
                <p>{lang.timeline16}</p>
                <p className="sub-txt">{lang.timeline17}</p>
                <p>{lang.timeline18}</p>
              </div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right"></div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left"></div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline19}</h4>
                <p>{lang.timeline20}</p>
                <p>{lang.timeline21}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li class="year-p">
              <div class="timeline-panel left year">
                <h3>17</h3>
              </div>
              <div class="timeline-panel right blank">&nbsp;</div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left"></div>
              <div className="timeline-image"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline22}</h4>
                <p>{lang.timeline23}</p>
                <p>{lang.timeline24}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left">
                <h4>{lang.timeline25}</h4>
                <p className="sub-txt">{lang.timeline26}</p>
              </div>
              <div className="timeline-image small"></div>
              <div className="timeline-panel right"></div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li class="year-p">
              <div class="timeline-panel left year">
                <h3>16</h3>
              </div>
              <div class="timeline-panel right blank">&nbsp;</div>
            </li>
          </Timeline>
        </TimeList>
        <TimeList>
          <Timeline>
            <li className="year-p">
              <div className="timeline-panel left"></div>
              <div className="timeline-image"></div>
              <div className="timeline-panel right">
                <h4>{lang.timeline27}</h4>
                <p>{lang.timeline28}</p>
              </div>
            </li>
          </Timeline>
        </TimeList>
      </Container>
    </Section>
  );
};
