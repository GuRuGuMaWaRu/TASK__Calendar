import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import FileSaver from "file-saver";

import prepareForExport from "../utils/prepareForExport";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Header = ({ classes, auth, events }) => {
  const exportToFile = () => {
    const processedEvents = prepareForExport(events);

    const fileName = "calendarEvents.json";

    const fileToSave = new Blob([JSON.stringify(processedEvents)], {
      type: "application/json",
      name: fileName
    });

    FileSaver.saveAs(fileToSave, fileName);
  };

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Button key="1" color="inherit">
            <a href="/auth/google">Login With Google</a>
          </Button>
        );
      default:
        return (
          <div>
            <Button key="2" color="inherit" onClick={exportToFile}>
              Export Calendar Events
            </Button>
            <Button key="3" color="inherit">
              <a href="/api/logout">Logout</a>
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Big Bad Calendar
          </Typography>
          {renderContent()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  events: PropTypes.array.isRequired
};

const mapStateToProps = ({ auth, events }) => ({
  auth,
  events
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
