import React, { useEffect, useState, useContext } from "react";
import { API } from "aws-amplify";

import { Button } from "antd";
import Title from "antd/lib/typography/Title";

import Context from "../store/context";
import Loading from "./Loading";
import ErrorNotice from "./ErrorNotice";

function GratitudeRetrieve() {
  const [gratitudeResponse, setGratitudeResponse] = useState("");
  const [gratitudeResponseKey, setGratitudeResponseKey] = useState("");
  const [gratitudeError, setGratitudeError] = useState(null);
  const [gratitudeIsLoading, setGratitudeIsLoading] = useState(false);
  const [reportGratitudeResponse, setReportGratitudeResponse] = useState("");
  const [reportGratitudeError, setReportGratitudeError] = useState(null);
  const [reportGratitudeIsLoading, setReportGratitudeIsLoading] =
    useState(false);
  const context = useContext(Context);

  const retrievePath = "/retrieve";
  const reportPath = "/report";

  // Start: Retrieves a gratitude from backend and sets loading/errors respectively

  // End: Retrieves a gratitude from backend and sets loading/errors respectively
  // Start: Sets and sends report data to backend including which gratitude was reported and the email address of the reporter
  const reportContent = {
    body: {
      email: context.userEmail,
      reportedSubmissionKey: gratitudeResponseKey,
    },
    headers: { "Content-Type": "application/json" },
  };
  const reportGratitude = async () => {
    try {
      setReportGratitudeIsLoading(true);
      const response = await API.post(context.api, reportPath, reportContent);
      if (!response.ok) {
        throw new Error("Failure to submit to database.");
      }
      setReportGratitudeIsLoading(false);
      setReportGratitudeResponse(response.confirmation);
    } catch (error) {
      setReportGratitudeIsLoading(false);
      setReportGratitudeError(error.message);
    }
  };
  // End: Sets and sends report data to backend including which gratitude was reported and the email address of the reporter

  // Start: Automatically retrieve a random gratitude from backend on render
  useEffect(() => {
    const retrieveGratitude = async () => {
      try {
        setGratitudeIsLoading(true);
        const response = await API.post(context.api, retrievePath);
        if (!response.ok) {
          throw new Error("Failure to retrieve from database.");
        }
        setGratitudeIsLoading(false);
        setGratitudeResponse(response.gratitude);
        setGratitudeResponseKey(response.gratitudeKey);
      } catch (error) {
        setGratitudeIsLoading(false);
        setGratitudeError(error.message);
      }
    };
    retrieveGratitude();
  }, [context.api]);
  // End: Automatically retrieve a random gratitude from backend on render

  // Start: Handler that starts reporting process
  const reportHandler = () => {
    reportGratitude();
  };
  // End: Handler that starts reporting process

  return (
    <>
      {/* Start: Set content accordling (sets loading content, error sets error content, success sets content from backend) */}
      {!gratitudeIsLoading && gratitudeResponse.length > 0 && (
        <>
          <Title level={3}>"{gratitudeResponse}"</Title>
          <Button type="danger" onClick={reportHandler}>
            Report
          </Button>
        </>
      )}
      {gratitudeIsLoading && <Loading />}
      {!gratitudeIsLoading && gratitudeError && (
        <ErrorNotice error={gratitudeError} />
      )}
      {!reportGratitudeIsLoading && reportGratitudeResponse.length > 0 && (
        <>
          <p>{reportGratitudeResponse}</p>
        </>
      )}
      {reportGratitudeIsLoading && <Loading />}
      {!reportGratitudeIsLoading && reportGratitudeError && (
        <ErrorNotice error={reportGratitudeError} />
      )}
      {/* End: Set content accordling (ets loading content, error sets error content, success sets content from backend) */}
    </>
  );
}

export default GratitudeRetrieve;
