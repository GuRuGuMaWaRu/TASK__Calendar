import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

const FromField = ({ value, error, handleChange }) => {
  return (
    <TextField
      id="from-time"
      label="From"
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
      onChange={event => handleChange("fromTime", event.target.value)}
    />
  );
};

FromField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: state.form.fromTime,
  error: state.errors.fromTime
});

export default connect(mapStateToProps)(FromField);
