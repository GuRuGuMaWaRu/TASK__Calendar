import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

import AddForm from "./Dialogs/AddForm";
import EditForm from "./Dialogs/EditForm";
import Calendar from "./Calendar";
import CalendarEmpty from "./CalendarEmpty";
import * as actions from "../actions";

const styles = theme => ({
  button: {
    position: "absolute",
    margin: theme.spacing.unit,
    right: "16px",
    bottom: "16px"
  },
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

class Dashboard extends React.Component {
  state = {
    openAddForm: false,
    openEditForm: false
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  handleClickOpen = () => {
    this.setState({
      openAddForm: true
    });
  };

  handleClose = type => {
    if (type === "save") {
      this.props.addEvent();
    } else if (type === "update") {
      this.props.updateEvent();
    } else if (type === "delete") {
      this.props.deleteEvent();
    }

    this.setState({
      openAddForm: false,
      openEditForm: false
    });
    this.props.clearForm();
  };

  handleEditEvent = event => {
    if (event.target.classList.contains("event")) {
      const id = event.target.id.replace(/(right)/, "");
      this.props.fetchEvent(id);
      this.setState({
        openEditForm: true
      });
    }
    return;
  };

  render() {
    const { classes, events } = this.props;

    return (
      <div className="dashboard" onClick={this.handleEditEvent}>
        {events.length > 0 ? <Calendar /> : <CalendarEmpty />}
        <div>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.button}
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Button>
        </div>
        <AddForm open={this.state.openAddForm} handleClose={this.handleClose} />
        <EditForm
          open={this.state.openEditForm}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  clearForm: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  fetchEvent: PropTypes.func.isRequired
};

const mapStateToProps = ({ events }) => ({
  events
});

export default connect(mapStateToProps, actions)(withStyles(styles)(Dashboard));
