import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import cover from "./cover.jpg";

const useStyles = makeStyles((theme) => ({
  cover: {
    position: "relative",
    flexGrow: 1,
    backgroundColor: theme.palette.text.secondary,
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
    "& .edit-button": {
      position: "absolute",
      zIndex: 1,
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
      padding: theme.spacing(1, 1.5),
      color: fade(theme.palette.common.white, 0.6),
      backgroundColor: fade(theme.palette.common.black, 0.1),
      borderRadius: 6,
      cursor: "pointer",
      transition: "background-color 300ms, color 300ms",
      "& .edit-label": {
        display: "none",
        marginRight: theme.spacing(0.5),
      },
      "& .edit-icon": {
        transition: "transform 200ms",
      },
    },
    "&:hover": {
      "& .edit-button": {
        backgroundColor: fade(theme.palette.common.black, 0.3),
        "&:hover": {
          color: fade(theme.palette.common.white, 0.8),
        },
        "& .edit-label": {
          display: "block",
        },
        "& .edit-icon": {
          transform: "scale(0.85)",
        },
      },
    },
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogAction: {
    margin: 0,
    padding: theme.spacing(2),
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        className={classes.cover}
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="edit-button" onClick={handleClickOpen}>
          <Typography variant="button" className="edit-label">
            Update Cover Photo
          </Typography>
          <CameraAltIcon fontSize="inherit" className="edit-icon" />
        </div>
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          disableTypography
          id="customized-dialog-title"
          className={classes.root}
        >
          <Typography variant="h6">Select Cover Photo</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className={classes.dialog}>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleClose}
            color="default"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            disableElevation
            onClick={handleClose}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
