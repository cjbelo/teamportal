import React from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rightMenu: {
    paddingLeft: theme.spacing(4.25),
  },
  selected: {
    paddingLeft: theme.spacing(4),
    borderLeft: `solid ${theme.spacing(0.25)}px ${theme.palette.primary.main}`,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Paper>
      <List component="nav">
        <ListItem
          button
          dense
          selected
          className={clsx(classes.rightMenu, classes.selected)}
        >
          <ListItemText primary="Top Stories" />
        </ListItem>
        <ListItem button dense className={classes.rightMenu}>
          <ListItemText primary="Most Recent" />
        </ListItem>
      </List>
    </Paper>
  );
};
