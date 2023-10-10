import React from "react";

const SummaryTab = ({ recipe }) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  return (
    <>
      <div dangerouslySetInnerHTML={createMarkup(recipe.details.summary)} />
    </>
  );
};

export default SummaryTab;
