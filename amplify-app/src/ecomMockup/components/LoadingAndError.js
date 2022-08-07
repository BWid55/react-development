import React from "react";
import NotFoundPage from "../pages/NotFoundPage";

function LoadingAndError({ isLoading, hasError, incorrectEndpoint, children }) {
  return (
    <>
      {!isLoading && !hasError && !incorrectEndpoint && <>{children}</>}
      {isLoading && !hasError && !incorrectEndpoint && <h1>LOADING</h1>}
      {!isLoading && !hasError && incorrectEndpoint && <NotFoundPage />}
      {hasError && <h1>ERROR</h1>}
    </>
  );
}

export default LoadingAndError;
