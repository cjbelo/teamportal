import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Post from "../Post";

import { INIT_POST } from "../../reducers/postAction";
import { Get } from "../../api";

const useStyles = makeStyles((theme) => ({
  emptyPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(30),
  },
}));

export default () => {
  const classes = useStyles();
  const { post, user } = useSelector(({ post, user }) => ({ post, user }));
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user.loggedIn) {
      if (post.loaded) {
        setLoading(false);
      } else {
        Get("/post/list", user.sessionId).then((res) => {
          if (!res.data.error) {
            dispatch({
              type: INIT_POST,
              payload: res.data.posts,
            });
          }
          setLoading(false);
        });
      }
    }
  }, [user, post, dispatch]);

  return (
    !loading && (
      <React.Fragment>
        {!post.posts.length ? (
          <Paper className={classes.emptyPost}>
            <Typography variant="body2" color="textSecondary">
              Posts of your friends and groups you joined will be displayed
              here.
            </Typography>
          </Paper>
        ) : (
          <React.Fragment>
            {post.posts.map((p, i) => (
              <Post p={p} key={i} />
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  );
};
