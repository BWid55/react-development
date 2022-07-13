import React, { useEffect } from "react";

function SetEmail(props) {
  const cognitoUserEmail = props.userEmail;

  useEffect(() => {
    props.onEmailChange(cognitoUserEmail);
  }, [props, cognitoUserEmail]);
  return <></>;
}

export default SetEmail;
