import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import peopleConnect from "./people.png";

import Footer from "../../compounds/Footer";
import FormLogin from "../../compounds/FormLogin";
import FormSignup from "../../compounds/FormSignup";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(3),
  },
  headTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  people: {
    maxWidth: "100%",
  },
  paper: {
    overflow: "hidden",
  },
  login: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default ({ history }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Box mr={15}>
            <Typography
              component="h2"
              variant="h5"
              className={classes.headTitle}
            >
              Team Portal helps you connect and share
              <br /> with the people in your team.
            </Typography>
            <img
              src={peopleConnect}
              alt="People Connect"
              className={classes.people}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <FormLogin history={history} />
          </Paper>
          <Box mt={3} />
          <Paper className={classes.paper}>
            <FormSignup history={history} />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
