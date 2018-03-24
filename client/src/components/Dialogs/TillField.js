import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

import * as actions from "../../actions";

class TillField extends Component {
  render() {
    const { value, error, updateForm } = this.props;

    return (
      <TextField
        id="till-time"
        label="Till"
        type="time"
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300, // 5 min
          min: "08:00",
          max: "17:00"
        }}
        margin="normal"
        fullWidth
        value={value}
        error={error.length > 0}
        helperText={error}
        onChange={event => updateForm("tillTime", event.target.value)}
      />
    );
  }
}

TillField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: state.form.tillTime,
  error: state.errors.tillTime
});

export default connect(mapStateToProps, actions)(TillField);
