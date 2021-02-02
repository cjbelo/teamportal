import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import AvatarImg from "./cj.jpg";

export default () => {
  return (
    <Paper>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Groups
          </ListSubheader>
        }
      >
        <ListItem dense>
          <ListItemAvatar>
            <Avatar>
              <SportsEsportsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link component={RouterLink} to={"/group/a"} color="textPrimary">
                PS4 Gamers
              </Link>
            }
            secondary="109 members"
          />
        </ListItem>
        <ListItem dense>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link component={RouterLink} to={"/group/a"} color="textPrimary">
                Workaholics
              </Link>
            }
            secondary="2 members"
          />
        </ListItem>
        <ListItem dense>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link component={RouterLink} to={"/group/a"} color="textPrimary">
                Bakasyonistas
              </Link>
            }
            secondary="26 members"
          />
        </ListItem>
        <ListItem dense>
          <ListItemAvatar>
            <Avatar alt="CJ" src={AvatarImg} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link component={RouterLink} to={"/group/a"} color="textPrimary">
                Hottest News
              </Link>
            }
            secondary="1 member"
          />
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            size="small"
            color="secondary"
            disableElevation
          >
            Show all groups
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};
