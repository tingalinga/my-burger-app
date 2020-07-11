import React from "react";

import classes from "./DrawerToggle.module.css";

const toggle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.toggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default toggle;
