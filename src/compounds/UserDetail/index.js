import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import WorkIcon from "@material-ui/icons/Work";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    "& > :first-child": {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box mt={2} pb={1}>
        <div className={classes.detailItem}>
          <WorkIcon />
          <Typography gutterBottom>
            <span>Senior Magento Developer at </span>
            <Link to="/" component={RouterLink}>
              PCCW Solution
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <SchoolIcon />
          <Typography gutterBottom>
            <span>Studied Computer Programming at </span>
            <Link to="/" component={RouterLink}>
              ACLC Daet
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <SchoolIcon />
          <Typography gutterBottom>
            <span>Went to </span>
            <Link to="/" component={RouterLink}>
              Mercedes High School
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <HomeIcon />
          <Typography gutterBottom>
            <span>Lives in </span>
            <Link to="/" component={RouterLink}>
              Mandaluyong City
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <LocationOnIcon />
          <Typography gutterBottom>
            <span>From </span>
            <Link to="/" component={RouterLink}>
              Mercedes, Camarines Norte
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <FavoriteIcon />
          <Typography gutterBottom>
            <span>In a relationship with </span>
            <Link to="/" component={RouterLink}>
              Emajelyn Raro Belo
            </Link>
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <AccessTimeIcon />
          <Typography gutterBottom>Joined on July 2009</Typography>
        </div>
      </Box>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        size="small"
        disableRipple
      >
        Edit Info
      </Button>
    </React.Fragment>
  );
};
