import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

class App extends React.PureComponent {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="app">
        <Header />
        {auth ? <Dashboard /> : <Landing />}
      </div>
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
