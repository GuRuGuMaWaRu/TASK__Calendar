import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

import * as actions from "../../actions";

class TitleField extends Component {
  state = {
    timeout: null
  };

  render() {
    const { value, error, updateForm } = this.props;

    return (
      <TextField
        autoFocus
        id="title"
        label="Title"
        margin="normal"
        fullWidth
        value={value}
        error={error.length > 0}
        helperText={error}
        onChange={event => updateForm("title", event.target.value)}
      />
    );
  }
}

TitleField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: state.form.title,
  error: state.errors.title
});

export default connect(mapStateToProps, actions)(TitleField);
