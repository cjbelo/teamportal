import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    "& > a": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: theme.spacing(0, 5),
      borderLeft: `solid 1px ${theme.palette.divider}`,
      "&:last-child": {
        borderRight: `solid 1px ${theme.palette.divider}`,
      },
      "&.selected:after": {
        position: "absolute",
        content: '""',
        display: "block",
        width: 12,
        height: 12,
        transform: "rotate(45deg)",
        left: "calc(50% - 6px)",
        bottom: -6,
        borderLeft: `solid 1px #9c9c9c`,
        backgroundColor: theme.palette.background.default,
      },
    },
  },
}));

const menus = [
  { path: "/profile", label: "Posts" },
  { path: "/profile/about", label: "About" },
  { path: "/profile/photos", label: "Photos" },
  { path: "/profile/friends", label: "Friends" },
  { path: "/profile/groups", label: "Groups" },
];

export default ({ history }) => {
  const classes = useStyles();
  const { pathname } = history.location;

  return (
    <div className={classes.menu}>
      {menus.map((menu, i) => {
        const selected = menu.path === pathname;
        return (
          <Link
            to={menu.path}
            component={RouterLink}
            variant="button"
            color={selected ? "textSecondary" : "primary"}
            underline={selected ? "none" : "hover"}
            className={selected ? "selected" : ""}
            key={i}
          >
            {menu.label}
          </Link>
        );
      })}
    </div>
  );
};
