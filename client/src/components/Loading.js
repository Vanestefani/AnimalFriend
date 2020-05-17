import React from "react";
import PropTypes from "prop-types";

import {CircularProgress ,LinearProgress} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  progress: {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
};

const NotFound = ({ classes }) => (
  <div className={classes.progress}>
    <center>
      {" "}
      <CircularProgress className={classes.l} size={50} />
      <div color="info">
        {" "}
        <i class="fas fa-paw"></i> Cargando ...

      </div>
      <LinearProgress />
    </center>
  </div>
);

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
