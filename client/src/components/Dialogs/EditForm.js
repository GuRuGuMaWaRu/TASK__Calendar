import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

import * as actions from "../../actions";
import TitleField from "./TitleField";
import FromField from "./FromField";
import TillField from "./TillField";
import validateInput from "../../utils/validateInput";

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

class EditForm extends Component {
  state = {
    timeout: null
  };

  onClose = type => {
    if (type === "save" || type === "update") {
      const errors = validateInput(this.props.form);
      if (Object.entries(errors).length > 0) {
        this.props.showErrors(errors);

        this.setState({
          timeout: clearTimeout(this.props.clearErrors, 2000)
        });
        this.setState({
          timeout: setTimeout(this.props.clearErrors, 2000)
        });

        return;
      }
    }

    this.props.handleClose(type);
  };

  render() {
    const { classes, open } = this.props;

    return (
      <Dialog
        open={open}
        maxWidth="xs"
        onClose={() => this.onClose("cancel")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter time from 8:00 till 17:00
          </DialogContentText>
          <form className={classes.container}>
            <TitleField />
            <FromField />
            <TillField />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.onClose("cancel")} color="default">
            Cancel
          </Button>
          <Button onClick={() => this.onClose("delete")} color="default">
            Delete
          </Button>
          <Button onClick={() => this.onClose("update")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  showErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ form }) => ({
  form
});

export default connect(mapStateToProps, actions)(withStyles(styles)(EditForm));
