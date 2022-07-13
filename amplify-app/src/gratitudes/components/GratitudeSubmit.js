import React, { useState, useContext } from "react";
import { API } from "aws-amplify";

import { Button, Form, Input, DatePicker, Select } from "antd";
import Title from "antd/lib/typography/Title";

import Context from "../store/context";
import Loading from "./Loading";
import ErrorNotice from "./ErrorNotice";

const { Option } = Select;

function GratitudeSubmit() {
  const [gratitudeInput, setGratitudeInput] = useState("");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [gratitudeSubmissionResponse, setGratitudeSubmissionResponse] =
    useState("");
  const [gratitudeSubmissionIsLoading, setGratitudeSubmissionIsLoading] =
    useState(false);
  const [gratitudeSubmissionError, setGratitudeSubmissionError] =
    useState(null);
  const context = useContext(Context);

  const submitPath = "/submit";

// Start: Sets and sends gratitude data to backend including submission text, submitter's email, submitter's age, and submitter's gender
  const submitContent = {
    body: {
      submitUserEmail: context.userEmail,
      submitUserGratitude: gratitudeInput,
      submitUserAge: birthdayInput,
      submitUserGender: genderInput,
    },
    headers: { "Content-Type": "application/json" },
  };
  const submitGratitude = async () => {
    try {
      setGratitudeSubmissionIsLoading(true);
      const response = await API.post(context.api, submitPath, submitContent);
      if (!response.ok) {
        throw new Error("Failure to submit to database.");
      }
      setGratitudeSubmissionIsLoading(false);
      setGratitudeSubmissionResponse(response.confirmation);
    } catch (error) {
      setGratitudeSubmissionIsLoading(false);
      setGratitudeSubmissionError(error.message);
    }
  };
// End: Sets and sends gratitude data to backend including submission text, submitter's email, submitter's age, and submitter's gender
// Start: Handlers that start submission process and reset input on API call conclusion
const submitInputHandler = (e) => {
    setGratitudeInput(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await submitGratitude();
    setGratitudeInput("");
  };
// End: Handlers that start submission process and reset input on API call conclusion
// Start: Handlers to turn user's input into user's age and capture user's age and user's gender
  const birthdateInputHandler = (value) => {
    let yearNew = new Date().getFullYear();
    let monthNew = new Date().getMonth();
    let dayNew = new Date().getDate();
    let yearOld = new Date(value).getFullYear();
    let monthOld = new Date(value).getMonth();
    let dayOld = new Date(value).getDate();
    let difference = yearNew - yearOld;
    if (monthOld > monthNew) difference--;
    else {
      if (monthOld === monthNew) {
        if (dayOld > dayNew) difference--;
      }
    }
    setBirthdayInput(difference);
  };
  const genderInputHandler = (value) => {
    setGenderInput(value);
  };
// End: Handlers to turn user's input into user's age and capture user's age and user's gender

  return (
    <>
      <Title level={2}>Submit Your Own!</Title>
{/* Start: Render form content (gratitude text, birthdate, gender) */}
      <Form onSubmit={submitHandler}>
        <label style={{ display: "block" }} htmlFor="gratitude">
          Your Gratitude:
        </label>
        <Input.TextArea
          style={{ width: "80%", maxWidth: "500px", textAlign: "center", borderColor: "rgb(4, 125, 149)" }}
          id="gratitude"
          placeholder="Your Gratitude Text"
          value={gratitudeInput}
          onChange={submitInputHandler}
        />
        <label style={{ display: "block" }} htmlFor="birthday">
          Your Birthday:
          <br />
          (click on the year)
        </label>
        <DatePicker
          allowClear
          id="birthday"
          type="date"
          min="1900-01-01"
          max="2025-12-31"
          onChange={(value) => {
            birthdateInputHandler(value);
          }}
        />
        <label style={{ display: "block" }} htmlFor="gender">
          Your Gender:
        </label>
        <Select
          placeholder="Select"
          style={{ width: "136px" }}
          id="gender"
          onChange={(value) => {
            genderInputHandler(value);
          }}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        {gratitudeInput ? (
          <Button
            style={{ display: "block", margin: "auto", marginTop:"5px", backgroundColor:"rgb(4, 125, 149)" }}
            onClick={submitHandler}
            type="primary"
          >
            Submit
          </Button>
        ) : (
          <Button
            style={{ display: "block", margin: "auto", marginTop:"5px" }}
            type="primary"
            disabled
          >
            Submit
          </Button>
        )}
      </Form>
{/* End: Render form content (gratitude text, birthdate, gender) */}
{/* Start: Set content accordling (sets loading content, error sets error content, success sets content from backend) */}
      {!gratitudeSubmissionIsLoading &&
        gratitudeSubmissionResponse.length > 0 && (
          <Title style={{width:"250px",margin:"auto"}} level={4}>{gratitudeSubmissionResponse}</Title>
        )}
      {gratitudeSubmissionIsLoading && <Loading />}
      {!gratitudeSubmissionIsLoading && gratitudeSubmissionError && (
        <ErrorNotice error={gratitudeSubmissionError} />
      )}
{/* End: Set content accordling (sets loading content, error sets error content, success sets content from backend) */}
    </>
  );
}

export default GratitudeSubmit;
