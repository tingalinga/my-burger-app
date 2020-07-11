import React, { Fragment } from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  const showModifier = props.show ? classes.Open : classes.Close;

  return (
    <Fragment>
      <Backdrop show={props.show} close={props.closeSideDrawer} />
      <div className={[classes.SideDrawer, showModifier].join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
