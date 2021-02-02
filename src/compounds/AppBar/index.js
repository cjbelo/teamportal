import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { fade, makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useSelector, useDispatch } from "react-redux";
import { logout, scrollToTop } from "../../utils/helper";

import LogoFull from "./logo-full.svg";
import AvatarImg from "./cj.jpg";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: theme.spacing(5),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.2),
    "&:hover, &:focus-within": {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    width: "100%",
    transition: theme.transitions.create("background-color"),
  },
  userSearch: {
    width: "auto",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    color: "inherit",
  },
  searchInnerInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  userSearchInnerInput: {
    width: "20ch",
    "&:focus": {
      width: "30ch",
    },
  },
  scrollTopButton: {
    position: "fixed",
    bottom: -100,
    right: theme.spacing(2),
    transition: theme.transitions.create("bottom"),
    "&.show": {
      bottom: theme.spacing(2),
    },
  },
  userHeadWrap: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  accountMenu: {
    width: theme.spacing(22),
  },
  accountMenuDiv: {
    margin: theme.spacing(0, 2),
  },
  accountName: {
    textTransform: "initial",
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1),
  },
}));

const RenderGuest = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} className={classes.wrap}>
        <Link to="/" component={RouterLink}>
          <img src={LogoFull} alt="Logo" className={classes.logo} />
        </Link>
      </Grid>
      <Grid item xs={4} className={classes.wrap}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.searchInput,
              input: classes.searchInnerInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const RenderUser = ({ goto, id, handleClick, user }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <div className={classes.userHeadWrap}>
          <Link to="/" component={RouterLink}>
            <img src={LogoFull} alt="Logo" className={classes.logo} />
          </Link>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.userHeadWrap}>
          <div className={clsx(classes.search, classes.userSearch)}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.searchInput,
                input: clsx(
                  classes.userSearchInnerInput,
                  classes.searchInnerInput
                ),
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <Box mr={1}>
            <Button onClick={() => goto(`/profile/${user.id}`)}>
              <Avatar alt={user.firstname} src={AvatarImg} />
              <Typography className={classes.accountName}>
                {user.firstname}
              </Typography>
            </Button>
          </Box>
          <Divider orientation="vertical" />
          <IconButton
            aria-label="show 4 new messages"
            color="inherit"
            onClick={() => goto("/messenger")}
          >
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account menu"
            aria-describedby={id}
            onClick={handleClick}
            color="inherit"
          >
            <ArrowDropDownIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
};

const AccountMenu = ({
  goto,
  menuId,
  menuOpen,
  anchorEl,
  closeAccountMenu,
  logout,
  user,
}) => {
  const classes = useStyles();

  return (
    <Popover
      id={menuId}
      open={menuOpen}
      anchorEl={anchorEl}
      onClose={closeAccountMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={2}
    >
      <div className={classes.accountMenu}>
        <List component="nav" aria-label="account menu">
          <ListItem button dense onClick={() => goto(`/profile/${user.id}`)}>
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
        <Divider className={classes.accountMenuDiv} />
        <List component="nav" aria-label="account menu">
          <ListItem button dense>
            <ListItemText primary="Edit" />
          </ListItem>
          <ListItem button dense onClick={() => goto("/settings")}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button dense onClick={() => goto("/help")}>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
        <Divider className={classes.accountMenuDiv} />
        <List component="nav" aria-label="account menu">
          <ListItem button dense onClick={logout}>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    </Popover>
  );
};

export default ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const triggerElevate = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const triggerScrollTop = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const openAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    setAnchorEl(null);
    logout(dispatch);
  };

  const goto = (url) => {
    history.push(url);
  };

  const menuOpen = Boolean(anchorEl);
  const menuId = menuOpen ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <AppBar elevation={triggerElevate ? 4 : 0}>
        <Container>
          <Toolbar disableGutters={true}>
            {user.loggedIn ? (
              <RenderUser
                goto={goto}
                id={menuId}
                handleClick={openAccountMenu}
                user={user.data}
              />
            ) : (
              <RenderGuest />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <AccountMenu
        goto={goto}
        menuId={menuId}
        menuOpen={menuOpen}
        anchorEl={anchorEl}
        closeAccountMenu={closeAccountMenu}
        logout={signout}
        user={user.data}
      />
      <div
        role="presentation"
        className={clsx(classes.scrollTopButton, triggerScrollTop && "show")}
        onClick={() => scrollToTop()}
      >
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
};
