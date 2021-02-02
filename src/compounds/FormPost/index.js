import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import TheatersIcon from "@material-ui/icons/Theaters";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelIcon from "@material-ui/icons/Cancel";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import PostType from "../../components/PostType";
import postStyleImg from "../../components/PostType/preview";
import postStyleColor from "../../components/PostType/color";
import Spinner from "../../components/Spinner";

import { ADD_POST } from "../../reducers/postAction";
import { Post } from "../../api/";
import AvatarImg from "./cj.jpg";

const useStyles = makeStyles((theme) => ({
  emptyPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(30),
  },
  poster: {
    overflow: "hidden",
  },
  posterWrap: {
    position: "relative",
    padding: theme.spacing(1.5, 2),
    display: "flex",
    alignItems: "flex-start",
    minHeight: theme.spacing(8),
    transition: "background-image 500ms, min-height 200ms",
    "&.styled": {
      alignItems: "center",
      minHeight: theme.spacing(56),
      backgroundSize: "cover",
      backgroundPosition: "center",
      "& .postStyleNav": {
        display: "flex",
        position: "absolute",
        zIndex: 2,
        left: 0,
        fontSize: "3rem",
        cursor: "pointer",
        color: "#fff",
        padding: theme.spacing(1, 0),
        backgroundColor: theme.palette.action.disabled,
        borderTopRightRadius: theme.spacing(0.75),
        borderBottomRightRadius: theme.spacing(0.75),
        opacity: 0,
        transition: "opacity 300ms",
        "&:hover": {
          opacity: 1,
        },
        "&.next": {
          left: "unset",
          right: 0,
          transform: "rotate(180deg)",
        },
      },
      "&:hover .postStyleNav": {
        opacity: 0.5,
      },
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    minHeight: theme.spacing(5),
  },
  postInput: {
    position: "relative",
    zIndex: 1,
    flexGrow: 1,
    padding: 0,
    fontSize: "1.25rem",
    "&.bigFont": {
      fontSize: "1.75rem",
      fontWeight: 300,
      "&.styled": {
        fontSize: "2.25rem",
        fontWeight: 400,
        padding: theme.spacing(0, 2),
      },
    },
    "&.styled > textarea": {
      textAlign: "center",
    },
  },
  postDivider: {
    margin: theme.spacing(1),
  },
  postOptionDivider: {
    margin: theme.spacing(0, 1),
  },
  mlIcon: {
    marginLeft: theme.spacing(0.5),
  },
  postOption: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderTop: `solid 1px ${theme.palette.divider}`,
    backgroundColor: "#fafafa",
  },
  grow: {
    flexGrow: 1,
  },
  postSetting: {
    marginRight: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const textArea = React.useRef(null);
  const [formState, setFormState] = React.useState(1); // 1, 2 & 3
  const [post, setPost] = React.useState("");
  const [postType] = React.useState(1);
  const [postStyle, setPostStyle] = React.useState(0);
  const [validForStyle, setValidForStyle] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  // preload images
  React.useEffect(() => {
    Object.keys(postStyleImg).forEach((k) => {
      new Image().src = postStyleImg[k];
    });
  }, []);

  const handleSetPost = (e) => {
    const { value } = e.target;
    const isValid = value.length < 140 && value.split(/\r\n|\r|\n/).length < 5;
    setValidForStyle(isValid);
    setPost(value);
  };

  const setInitFormState = () => {
    if (formState === 1) {
      setFormState(2);
    }
  };

  const handleClickAway = () => {
    if (!post && formState < 3) {
      setFormState(1);
    }
  };

  const openPostStyle = () => {
    setFormState(3);
  };

  const closePostStyle = () => {
    setFormState(2);
  };

  const handleSubmitPost = () => {
    if (post && !loading) {
      const postData = {
        type: postType,
        post,
        style: formState === 3 && validForStyle ? postStyle : -1,
      };
      setLoading(true);
      Post("/post/add", postData, true).then((res) => {
        if (!res.data.error) {
          setFormState(1);
          setPost("");
          setPostStyle(0);
          setValidForStyle(true);
          dispatch({ type: ADD_POST, payload: res.data.post });
        }
        setLoading(false);
      });
    }
  };

  const styledPost =
    formState === 3 && validForStyle
      ? {
          backgroundImage: `url(${postStyleImg[postStyle]})`,
        }
      : {};

  const fontColor =
    formState === 3 && validForStyle
      ? { color: postStyleColor[postStyle] }
      : {};

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper className={classes.poster}>
        <div
          className={clsx(
            classes.posterWrap,
            formState === 3 && validForStyle && "styled"
          )}
          style={styledPost}
        >
          {(formState < 3 || !validForStyle) && (
            <Link to={`/profile/${user.id}`} component={RouterLink}>
              <Avatar alt="CJ" src={AvatarImg} className={classes.avatar} />
            </Link>
          )}
          {formState === 3 && validForStyle && (
            <React.Fragment>
              {postStyle > 0 && (
                <div
                  className="postStyleNav"
                  onClick={() => setPostStyle(postStyle - 1)}
                >
                  <NavigateBeforeIcon fontSize="inherit" />
                </div>
              )}
              {postStyle + 1 < Object.keys(postStyleImg).length && (
                <div
                  className="postStyleNav next"
                  onClick={() => setPostStyle(postStyle + 1)}
                >
                  <NavigateBeforeIcon fontSize="inherit" />
                </div>
              )}
            </React.Fragment>
          )}
          <div className={classes.inputWrap}>
            <InputBase
              className={clsx(
                classes.postInput,
                formState > 1 && validForStyle && "bigFont",
                formState === 3 && validForStyle && "styled"
              )}
              style={fontColor}
              placeholder="What's on your mind, CJ?"
              inputProps={{ "aria-label": "what's new" }}
              value={post}
              onChange={handleSetPost}
              onFocus={setInitFormState}
              margin="none"
              multiline
              ref={textArea}
            />
            {formState < 2 && (
              <React.Fragment>
                <Tooltip title="Photo" arrow>
                  <IconButton aria-label="photo" disableRipple size="small">
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Video" arrow>
                  <IconButton
                    aria-label="video"
                    disableRipple
                    size="small"
                    className={classes.mlIcon}
                  >
                    <TheatersIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="News/Blog" arrow>
                  <IconButton
                    aria-label="news"
                    disableRipple
                    size="small"
                    className={classes.mlIcon}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.postDivider}
                />
                <Tooltip title="Styled Post" arrow>
                  <span>
                    <IconButton
                      aria-label="post style"
                      disableRipple
                      size="small"
                      onClick={openPostStyle}
                      disabled={!validForStyle}
                    >
                      <ColorLensIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </React.Fragment>
            )}
          </div>
        </div>
        {formState > 1 && (
          <Box className={classes.postOption}>
            {(formState === 2 || !validForStyle) && (
              <React.Fragment>
                <Tooltip title="Styled Post" arrow>
                  <span>
                    <IconButton
                      aria-label="post style"
                      disableRipple
                      size="small"
                      onClick={openPostStyle}
                      disabled={!validForStyle}
                    >
                      <ColorLensIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.postOptionDivider}
                />
                <Tooltip title="Photo" arrow>
                  <IconButton aria-label="photo" disableRipple size="small">
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Video" arrow>
                  <IconButton
                    aria-label="video"
                    disableRipple
                    size="small"
                    className={classes.mlIcon}
                  >
                    <TheatersIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="News/Blog" arrow>
                  <IconButton
                    aria-label="news"
                    disableRipple
                    size="small"
                    className={classes.mlIcon}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )}
            {formState === 3 && validForStyle && (
              <React.Fragment>
                <IconButton
                  aria-label="close"
                  disableRipple
                  size="small"
                  edge="start"
                  onClick={closePostStyle}
                >
                  <CancelIcon />
                </IconButton>
                <PostType postStyle={postStyle} setPostStyle={setPostStyle} />
              </React.Fragment>
            )}
            <div className={classes.grow} />
            <IconButton
              aria-label="post style"
              disableRipple
              size="small"
              className={classes.postSetting}
            >
              <SettingsIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleSubmitPost}
              style={{ width: 80 }}
              size="large"
              disabled={!post}
            >
              {loading ? <Spinner /> : "Post"}
            </Button>
          </Box>
        )}
      </Paper>
    </ClickAwayListener>
  );
};
