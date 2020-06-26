import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            add={() => props.add(control.type)}
            remove={() => props.remove(control.type)}
            disabled={props.disabledInfo[control.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordering}
      >
        Place Order
      </button>
    </div>
  );
};

export default buildControls;
