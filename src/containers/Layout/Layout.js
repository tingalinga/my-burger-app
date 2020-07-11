import React, { Component, Fragment } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  openSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: true,
    });
  };

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar showSideDrawer={this.openSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
