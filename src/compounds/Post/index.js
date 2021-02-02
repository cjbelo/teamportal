import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import ButtonBase from "@material-ui/core/ButtonBase";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";

import bg from "../../components/PostType/preview";
import pcolor from "../../components/PostType/color";

const useStyles = makeStyles((theme) => ({
  postHeader: {
    position: "relative",
    display: "flex",
    padding: theme.spacing(2, 2, 1),
  },
  moreButton: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    width: theme.spacing(6),
    height: theme.spacing(4),
    fontSize: "2rem",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  postAuthor: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: theme.spacing(1.5),
    "& *": {
      lineHeight: `${theme.spacing(2)}px`,
    },
    "& a": {
      display: "inline-block",
      fontWeight: 600,
      marginBottom: theme.spacing(0.5),
    },
  },
  postWrap: {
    padding: theme.spacing(1, 2),
    "&.styled": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: theme.spacing(56),
      padding: theme.spacing(0, 5),
      marginTop: theme.spacing(1),
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  styledPost: {
    textAlign: "center",
    fontSize: "2.25rem",
    fontWeight: 400,
  },
  reactWrap: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `solid 1px ${blueGrey[100]}`,
    margin: theme.spacing(1, 2, 0),
    padding: theme.spacing(1.5, 0, 2),
    "&.styled": {
      borderTop: "none",
      marginTop: 0,
    },
  },
  commentWrap: {
    display: "flex",
    alignItems: "flex-start",
    borderTop: `solid 1px ${blueGrey[100]}`,
    padding: theme.spacing(1.5, 2),
  },
  commentAvatar: {
    width: theme.spacing(4.25),
    height: theme.spacing(4.25),
  },
  actionButton: {
    color: theme.palette.text.secondary,
  },
  commentInput: {
    flexGrow: 1,
    margin: theme.spacing(0, 2, 0, 1),
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.hint,
  },
  commentSend: {
    height: theme.spacing(4.25),
  },
}));

export default ({ p }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const isStyled = p.post_style > -1;
  const postStyle = isStyled
    ? {
        backgroundImage: `url(${bg[p.post_style]})`,
      }
    : {};
  const postColor = isStyled
    ? {
        color: pcolor[p.post_style],
      }
    : {};

  return (
    <Box mt={2}>
      <Paper>
        <div className={classes.postHeader}>
          <ButtonBase className={classes.moreButton} disableRipple>
            <MoreHorizIcon fontSize="inherit" />
          </ButtonBase>
          <Avatar>
            <PhotoCameraIcon />
          </Avatar>
          <div className={classes.postAuthor}>
            <div>
              <Link to="/" component={RouterLink}>
                CJ Belo
              </Link>
            </div>
            <Typography variant="body2" color="textSecondary">
              12 minutes
            </Typography>
          </div>
        </div>
        <div
          className={clsx(classes.postWrap, isStyled && "styled")}
          style={postStyle}
        >
          <Typography
            className={clsx(isStyled && classes.styledPost)}
            style={postColor}
          >
            {p.post}
          </Typography>
        </div>
        <div className={clsx(classes.reactWrap, isStyled && "styled")}>
          <ButtonBase
            disableRipple
            className={classes.actionButton}
            onClick={() => setLike(true)}
            style={like ? { color: red[600] } : {}}
          >
            <FavoriteIcon />
          </ButtonBase>
          <ButtonBase
            disableRipple
            className={classes.actionButton}
            title="Leave a comment"
            onClick={() => setShowForm(!showForm)}
          >
            <CommentIcon />
          </ButtonBase>
        </div>
        {showForm && (
          <div className={classes.commentWrap}>
            <Avatar className={classes.commentAvatar}>
              <PhotoCameraIcon fontSize="inherit" />
            </Avatar>
            <Paper variant="outlined" className={classes.commentInput}>
              <InputBase
                placeholder="Write a comment..."
                inputProps={{ "aria-label": "comment" }}
                margin="none"
                multiline
                fullWidth
                value={comment}
                onChange={handleChange}
              />
            </Paper>
            <ButtonBase
              disableRipple
              className={clsx(classes.actionButton, classes.commentSend)}
            >
              <SendIcon />
            </ButtonBase>
          </div>
        )}
      </Paper>
    </Box>
  );
};
