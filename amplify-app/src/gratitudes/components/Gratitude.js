import React from "react";

import { Divider } from "antd";
import Title from "antd/lib/typography/Title";

import GratitudeRetrieve from "./GratitudeRetrieve";
import GratitudeSubmit from "./GratitudeSubmit";

function Gratitude() {
  return (
    <>
      <Title level={5} style={{width:"80%", margin:"auto"}}>
        It's like a gratitude journal but everyone gets to read your journal!
      </Title>
      <Title level={2}>Someone was<br/>grateful for...</Title>
      <GratitudeRetrieve />
      <Divider />
      <GratitudeSubmit />
    </>
  );
}

export default Gratitude;
