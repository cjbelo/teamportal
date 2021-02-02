import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bioHead: {
    display: "flex",
    alignItems: "center",
    fontSize: "2rem",
    "& > :first-child": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.bioHead}>
        <AccountCircleIcon fontSize="inherit" />
        <Typography variant="h6" component="h5">
          About Me
        </Typography>
      </Box>
      <Box mt={2} pb={2}>
        <Typography
          align="center"
          display="block"
          color="textPrimary"
          style={{ paddingBottom: 20 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
          quam id orci tincidunt, non sodales magna efficitur. Aliquam vitae
          dignissim ipsum. Cras suscipit eros id nisi aliquam mollis.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          size="small"
          disableRipple
        >
          Edit
        </Button>
      </Box>
      <Divider />
    </React.Fragment>
  );
};
