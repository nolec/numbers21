import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Download = styled.a`
  display: flex;
  align-items: center;
`;
const Icon = styled.img.attrs(props => ({ src: props.theme.file.save }))``;
export default ({ filename, orgName, table }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    console.log(filename, orgName);
    const Down = async () => {
      const res = await axios({
        url: `http://localhost:5000/server/uploads/${filename}`,
        method: "GET",
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setUrl(url);
    };
    Down();
  }, [filename]);
  return (
    <Download href={url} download={`${orgName}`}>
      <Icon />
      {table ? "" : orgName}
    </Download>
  );
};
