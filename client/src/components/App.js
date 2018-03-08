import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={auth ? Dashboard : Landing} />
          <Route exact path="/calendar" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, actions)(App);
