import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "../../compounds/AppBar";
import FormPost from "../../compounds/FormPost";
import Posts from "../../compounds/Posts";
import AboutMe from "../../compounds/AboutMe";
import UserDetail from "../../compounds/UserDetail";
import ProfileCover from "../../compounds/ProfileCover";
import ProfileImage from "../../compounds/ProfileImage";
import ProfileMenu from "../../compounds/ProfileMenu";

import { scrollToTop } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  coverWrap: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: theme.spacing(50),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  menuWrap: {
    display: "flex",
    height: theme.spacing(6),
    paddingLeft: theme.spacing(35),
  },
  userImg: {
    position: "absolute",
    zIndex: 1,
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  userName: {
    position: "absolute",
    zIndex: 1,
    left: theme.spacing(35),
    bottom: theme.spacing(8),
    color: theme.palette.common.white,
    textShadow: "0 0 3px rgba(0, 0, 0, .8)",
  },
  aboutWrap: {
    padding: theme.spacing(2),
  },
}));

export default ({ history }) => {
  const classes = useStyles();

  React.useEffect(() => {
    scrollToTop(false);
  });

  return (
    <React.Fragment>
      <AppBar history={history} />
      <Container>
        <Paper className={classes.coverWrap}>
          <ProfileCover />
          <Box className={classes.menuWrap}>
            <div className={classes.userImg}>
              <ProfileImage />
            </div>
            <Typography variant="h4" className={classes.userName}>
              CJ Belo
            </Typography>
            <ProfileMenu history={history} />
          </Box>
        </Paper>
        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper className={classes.aboutWrap}>
              <AboutMe />
              <UserDetail />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <FormPost />
            <Posts />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
