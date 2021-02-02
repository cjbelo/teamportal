import "date-fns";
import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Modal from "@material-ui/core/Modal";

import { isValidEmail } from "../../utils/helper";
import { Post } from "../../api/";

import Spinner from "../../components/Spinner";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
  },
  formHeader: {
    textAlign: "center",
  },
  optionWrap: {
    flexDirection: "row",
    "& > label:first-child": {
      marginRight: theme.spacing(5),
    },
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  alert: {
    marginTop: "25vh",
  },
}));

export default ({ history }) => {
  const classes = useStyles();
  const fields = [
    "firstname",
    "lastname",
    "birthday",
    "gender",
    "email",
    "password",
  ];
  const defaultForm = {};
  fields.forEach((f) => {
    const value = f === "birthday" ? null : "";
    defaultForm[f] = { value, error: "" };
  });

  const [form, setForm] = React.useState(defaultForm);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: { error: "", value },
    }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      birthday: { error: "", value: date },
    }));
  };

  const handleSubmit = (e) => {
    const sform = {};
    let hasError = false;
    fields.forEach((f) => {
      sform[f] = form[f];
      if (!form[f].value) {
        sform[f].error = "Required Field";
        hasError = true;
      } else if (f === "email" && !isValidEmail(form[f].value)) {
        sform[f].error = "Invalid Email Address";
        hasError = true;
      } else if (f === "password" && form[f].value.length < 6) {
        sform[f].error = "Password should be at least 6 characters";
        hasError = true;
      }
    });
    if (hasError) {
      setForm(sform);
    } else {
      setLoading(true);
      const data = {};
      Object.keys(form).forEach((f) => {
        data[f] = form[f].value;
      });
      Post("/user/signup", data).then((res) => {
        if (!res.data.error) {
          setSuccess(true);
          setLoading(false);
          setForm(defaultForm);
        }
      });
    }
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <form noValidate className={classes.form} onSubmit={handleSubmit}>
        <Box mb={2} className={classes.formHeader}>
          <Typography component="h4" variant="h6">
            First time on Team Portal?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign up for Team Portal
          </Typography>
        </Box>
        <Box mt={2} />
        <TextField
          variant="outlined"
          required
          fullWidth
          name="firstname"
          label="First Name"
          autoComplete="firstname"
          margin="none"
          error={!!form.firstname.error}
          helperText={form.firstname.error}
          onChange={handleChange}
          value={form.firstname.value}
        />
        <Box mt={2} />
        <TextField
          variant="outlined"
          required
          fullWidth
          name="lastname"
          label="Last Name"
          autoComplete="lastname"
          margin="none"
          error={!!form.lastname.error}
          helperText={form.lastname.error}
          onChange={handleChange}
          value={form.lastname.value}
        />
        <Box mt={2} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="none"
            fullWidth
            label="Birthday"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            required
            error={!!form.birthday.error}
            helperText={form.birthday.error}
            onChange={handleDateChange}
            value={form.birthday.value}
          />
        </MuiPickersUtilsProvider>
        <Box mt={2} />
        <FormControl component="fieldset" error={!!form.gender.error}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={form.gender.value}
            onChange={handleChange}
            className={classes.optionWrap}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <Box mt={2} />
        <TextField
          variant="outlined"
          required
          fullWidth
          name="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          margin="none"
          error={!!form.email.error}
          helperText={form.email.error}
          onChange={handleChange}
          value={form.email.value}
        />
        <Box mt={2} />
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          type="password"
          label="Password"
          margin="none"
          error={!!form.password.error}
          helperText={form.password.error}
          onChange={handleChange}
          value={form.password.value}
        />
        <Box mt={2.5} />
        <Button
          type={loading ? "button" : "submit"}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          {loading ? <Spinner /> : "Register"}
        </Button>
      </form>
      {loading && <LinearProgress />}
      {success && (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={true}
          onClose={() => setSuccess(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <Alert
            severity="success"
            onClose={() => setSuccess(false)}
            className={classes.alert}
          >
            <AlertTitle>Registration Successful!</AlertTitle>
            Please check your email for details.
          </Alert>
        </Modal>
      )}
    </React.Fragment>
  );
};
