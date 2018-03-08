import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

const TillField = ({ value, error, handleChange }) => {
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
      onChange={event => handleChange("tillTime", event.target.value)}
    />
  );
};

TillField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: state.form.tillTime,
  error: state.errors.tillTime
});

export default connect(mapStateToProps)(TillField);
