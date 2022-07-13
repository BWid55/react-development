import React from "react";

import { Card } from "antd";

function WordSearchListItem(props) {
  return (
    <>
{/* Start: Retrieves list data from parent and shows list items */}
      <Card style={{maxWidth:"500px",margin:"auto",marginBottom:"10px"}} title={props.wordSearchWordResponse}>
        Used in {props.wordSearchPercentReponse}% of submissions.
      </Card>
{/* End: Retrieves list data from parent and shows list items */}
    </>
  );
}
export default WordSearchListItem;
