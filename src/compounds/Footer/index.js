import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    padding: theme.spacing(5, 0, 6),
    borderTop: "1px solid #dfe2e8",
    "& div a + a": {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link to="/" component={RouterLink}>
            Team Portal
          </Link>
          {" © "}
          {new Date().getFullYear()}
        </Typography>
      </div>
      <div>
        <Link to="/" component={RouterLink}>
          About
        </Link>
        <Link to="/" component={RouterLink}>
          Terms
        </Link>
        <Link to="/" component={RouterLink}>
          Privacy Policy
        </Link>
        <Link to="/" component={RouterLink}>
          Developers
        </Link>
      </div>
      <div>
        <Link to="/" component={RouterLink}>
          English
        </Link>
        <Link to="/" component={RouterLink}>
          Filipino
        </Link>
        <Link to="/" component={RouterLink}>
          All Languages »
        </Link>
      </div>
    </div>
  );
};
