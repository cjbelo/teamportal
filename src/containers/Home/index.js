import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import ListLinks from "../../compounds/ListLinks";
import FeedOption from "../../compounds/FeedOption";
import Groups from "../../compounds/Groups";
import FormPost from "../../compounds/FormPost";
import Posts from "../../compounds/Posts";

export default () => {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <ListLinks />
        </Grid>
        <Grid item xs={6}>
          <FormPost />
          <Box mt={2} />
          <Posts />
        </Grid>
        <Grid item xs={3}>
          <FeedOption />
          <Box mt={2} />
          <Groups />
        </Grid>
      </Grid>
    </Box>
  );
};
