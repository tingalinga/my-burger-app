import React, { Fragment } from "react";

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredientsSummary).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredientsSummary[key]}
      </li>
    );
  });

  return (
    <Fragment>
      <h3>Order Summary</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{summary}</ul>
      <p>Continue to place your order!</p>
    </Fragment>
  );
};

export default orderSummary;
