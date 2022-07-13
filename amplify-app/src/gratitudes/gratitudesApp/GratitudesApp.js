import { API } from "aws-amplify";
import awsExports from "../../aws-exports";
import React, { useState, useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { Layout, Button } from "antd";
import Title from "antd/lib/typography/Title";

import SetEmail from "../components/SetEmail";
import Gratitude from "../components/Gratitude";
import WordSearch from "../components/WordSearch";
import Context from "../store/context";

API.configure(awsExports);
const { Header, Content, Footer } = Layout;

function GratitudeApp({ signOut, user }) {
    //Allow save of user email app wide
    const [userEmail, setUserEmail] = useState("");
    const userEmailHandler = (cognitoUserEmail) => {
      setUserEmail(cognitoUserEmail);
    };

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
    return (
        <>
        {/* Start: Sets user email for use in app wide context */}
        <SetEmail
          userEmail={user.attributes.email}
          onEmailChange={userEmailHandler}
        />
        {/* End: Sets user email for use in app wide context */}
        <Layout>
          <Header style={{height:"120px", backgroundColor:"rgb(4, 125, 149)"}}>
            <Title style={{ color: "white", paddingTop:"60px" }} level={1}>
              Gratitudes
            </Title>
          </Header>
          {/* Start: Provides base api url for AWS enpoint calls */}
          <Context.Provider value={{ api: "amplifyapi", userEmail: userEmail }}>
          {/* End: Provides base api url for AWS enpoint calls */}
            <Content>
              <Gratitude />
              <WordSearch />
            </Content>
          </Context.Provider>
          <Footer style={{backgroundColor:"rgb(4, 125, 149)"}}>
            <Button onClick={signOut}>Sign Out</Button>
          </Footer>
        </Layout>
        </>
    );
  }
  
  export default withAuthenticator(GratitudeApp);
