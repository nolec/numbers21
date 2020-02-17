import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Download = styled.div``;
const Down = () => {
  axios({
    url: "http://localhost:5000/server/alla_app_video.mp4",
    method: "GET",
    responseType: "blob"
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const down = document.querySelector(".down");
    const link = document.createElement("a");
    const icon = document.createElement("img");
    link.href = url;
    icon.setAttribute("src", require("../../assets/images/icon/save-24px.svg"));
    link.setAttribute("download", "File.mp4");
    link.append(icon);
    down.append(link);
  });
};
Down();
export default ({ filename }) => {
  return <Download className="down"></Download>;
};
