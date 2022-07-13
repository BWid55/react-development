import { API } from "aws-amplify";
import React, { useState, useContext } from "react";

import { Button, Input } from "antd";

import Context from "../store/context";
import Loading from "./Loading";
import ErrorNotice from "./ErrorNotice";

function WordSearchForm(props) {
  const [wordSearchInput, setWordSearchInput] = useState("");
  const [wordSearchSubmissionIsLoading, setWordSearchSubmissionIsLoading] =
    useState(false);
  const [wordSearchSubmissionError, setWordSearchSubmissionError] =
    useState(null);
  const context = useContext(Context);

  const wordSearchPath = "/word-search";

// Start: Submits user word search content and retrieves data from backend
  const wordSearchSubmit = async () => {
    try {
      setWordSearchSubmissionIsLoading(true);
      const response = await API.get(
        context.api,
        wordSearchPath + "/" + wordSearchInput
      );
      if (!response.ok) {
        throw new Error("Failure to submit to database.");
      }
      setWordSearchSubmissionIsLoading(false);
      const newWordSearchData = {
        wordSearchWordResponse: response.word,
        wordSearchPercentReponse: Math.floor(
          response.percentageOfTimesUsed * 100
        ),
        key: response.key,
      };
      props.onNewWordSearch(newWordSearchData);
    } catch (error) {
      setWordSearchSubmissionIsLoading(false);
      setWordSearchSubmissionError(error.message);
    }
  };
// End: Submits user word search content and retrieves data from backend
// Start:Handlers to capture user's word search data and reset word search input
  const wordSearchInputHandler = (e) => {
    setWordSearchInput(e.target.value);
  };
  const submitWordSearchHandler = (e) => {
    e.preventDefault();
    wordSearchSubmit();
    setWordSearchInput("");
  };
// End:Handlers to capture user's word search data and reset word search input

  return (
    <>
{/* Start: Form content for word search submission */}
      <form onSubmit={submitWordSearchHandler}>
        <label style={{ display: "block" }} htmlFor="word-search">
          Word Search
        </label>
        <Input
          style={{
            width: "136px",
            textAlign: "center",
            borderColor: "rgb(4, 125, 149)",
          }}
          placeholder="Your Word"
          id="word-search"
          onChange={wordSearchInputHandler}
          value={wordSearchInput}
        />
        {wordSearchInput.length > 0 ? (
          <Button
            style={{ display: "block", margin: "auto", marginTop: "5px", backgroundColor:"rgb(4, 125, 149)" }}
            onClick={submitWordSearchHandler}
            type="primary"
          >
            Submit
          </Button>
        ) : (
          <Button
            style={{ display: "block", margin: "auto", marginTop: "5px" }}
            type="primary"
            disabled
          >
            Submit
          </Button>
        )}
      </form>
{/* End: Form content for word search submission */}
{/* Start: Shows content accordingly (successful backend call send data to parent, then to child list component, loading shows loading, and error shows error) */}
      {wordSearchSubmissionIsLoading && <Loading />}
      {!wordSearchSubmissionIsLoading && wordSearchSubmissionError && (
        <ErrorNotice error={wordSearchSubmissionError} />
      )}
{/* End: Shows content accordingly (successful backend call send data to parent, then to child list component, loading shows loading, and error shows error) */}
    </>
  );
}
export default WordSearchForm;
