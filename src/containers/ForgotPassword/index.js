import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../../compounds/Copyright";
import Logo from "./logo-square.svg";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    margin: theme.spacing(5, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    marginBottom: theme.spacing(1),
    "& img": {
      verticalAlign: "top",
      height: "3rem",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bottomLink: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.logo}>
            <img src={Logo} alt="Logo" />
          </div>
          <Typography component="h1" variant="h5">
            Reset your Password
          </Typography>
          <form className={classes.form} noValidate>
            <Box mb={1} mt={2}>
              <Typography component="p" variant="body2">
                Enter the email address linked to your account and we'll send
                you a reset link.
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Send
            </Button>
            <Box className={classes.bottomLink}>
              <Link to="/" component={RouterLink}>
                Back to Sign In
              </Link>
            </Box>
          </form>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </Container>
    </div>
  );
};
