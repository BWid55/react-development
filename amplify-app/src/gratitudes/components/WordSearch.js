import React, { useState } from "react";

import { Divider } from "antd";

import WordSearchForm from "./WordSearchForm";
import WordSearchListItem from "./WordSearchListItem";

function WordSearch() {
  const [wordSearches, setWordSearches] = useState([]);

// Start: Handler retrieves data from word searches and stores them for listing
  const newWordSearchHandler = (newWordSearchData) => {
    setWordSearches((prevWordSearches) => {
      return [newWordSearchData, ...prevWordSearches];
    });
  };
// End: Handler retrieves data from word searches and stores them for listing

  return (
    <>
      <Divider />
      <WordSearchForm onNewWordSearch={newWordSearchHandler} />
      {wordSearches.length > 0 && (
        <p style={{width:"250px",margin:"auto"}}>Currently this section returns synthetic data from the server.</p>
      )}
      {wordSearches.map((search) => (
        <WordSearchListItem
          wordSearchWordResponse={search.wordSearchWordResponse}
          wordSearchPercentReponse={search.wordSearchPercentReponse}
          key={search.key}
        />
      ))}
      <Divider />
    </>
  );
}
export default WordSearch;
