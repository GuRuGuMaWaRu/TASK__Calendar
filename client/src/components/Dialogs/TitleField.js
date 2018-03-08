import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

const TitleField = ({ value, error, handleChange }) => {
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
      onChange={event => handleChange("title", event.target.value)}
    />
  );
};

TitleField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: state.form.title,
  error: state.errors.title
});

export default connect(mapStateToProps)(TitleField);
