import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

import TitleField from "./TitleField";
import FromField from "./FromField";
import TillField from "./TillField";
import * as actions from "../../actions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class AddForm extends Component {
  render() {
    const { classes, open, handleClose, updateForm } = this.props;

    return (
      <Dialog
        open={open}
        maxWidth="xs"
        onClose={() => handleClose("cancel")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter time from 8:00 till 17:00
          </DialogContentText>
          <form className={classes.container}>
            <TitleField handleChange={updateForm} />
            <FromField handleChange={updateForm} />
            <TillField handleChange={updateForm} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("cancel")} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose("save")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default connect(null, actions)(withStyles(styles)(AddForm));
