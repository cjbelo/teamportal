import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link component={RouterLink} to={"/"} color="inherit">
        Team Portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
