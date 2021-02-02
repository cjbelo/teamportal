import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";

import img from "./cj.jpg";

const useStyles = makeStyles((theme) => ({
  wrap: {
    position: "relative",
    width: theme.spacing(30),
    height: theme.spacing(30),
    border: `solid ${theme.spacing(0.5)}px ${theme.palette.common.white}`,
    boxShadow: `0 3px 3px ${fade(theme.palette.common.black, 0.08)}`,
    borderRadius: theme.spacing(15),
    overflow: "hidden",
    "& .cover, & .edit": {
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundColor: "transparent",
      transition: "background-color 300ms",
    },
    "& .edit": {
      top: 100,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      color: fade(theme.palette.common.white, 0),
      borderRadius: theme.spacing(6),
      transition: "color 300ms, top 150ms",
    },
    "&:hover": {
      "& .cover": {
        backgroundColor: fade(theme.palette.common.black, 0.5),
      },
      "& .edit": {
        top: 0,
        color: fade(theme.palette.common.white, 0.5),
      },
    },
  },
  img: {
    width: "100%",
    height: "100%",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <Avatar alt="user" src={img} className={classes.img} />
      <div className="cover" />
      <ButtonBase className="edit">
        <CameraAltIcon />
        <Typography>Update</Typography>
      </ButtonBase>
    </div>
  );
};
