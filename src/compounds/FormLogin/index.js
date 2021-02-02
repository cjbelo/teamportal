import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

import { useDispatch } from "react-redux";

import { USER_LOGIN } from "../../reducers/userAction";
import { isValidEmail } from "../../utils/helper";
import * as Session from "../../utils/session";
import { Post } from "../../api/";

import Spinner from "../../components/Spinner";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
  },
  login: {
    display: "flex",
    justifyContent: "space-between",
  },
  loginBtn: {
    width: theme.spacing(15),
  },
}));

export default ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const fields = ["email", "password"];
  const defaultForm = {};
  fields.forEach((f) => {
    defaultForm[f] = { value: "", error: "" };
  });

  const [form, setForm] = React.useState(defaultForm);
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: { error: "", value },
    }));
    setAlertMsg("");
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
      data["remember"] = remember ? 1 : 0;
      Post("/user/signin", data).then((res) => {
        if (!res.data.error) {
          const sessionId = res.data.token;
          Session.set("session", sessionId);
          dispatch({
            type: USER_LOGIN,
            payload: {
              sessionId,
              data: res.data.userData,
            },
          });
        } else {
          Session.del("session");
          setLoading(false);
          setAlertMsg(res.data.message);
        }
      });
    }
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <form noValidate className={classes.form} onSubmit={handleSubmit}>
        {!!alertMsg && (
          <Box mb={2}>
            <Alert severity="error">{alertMsg}</Alert>
          </Box>
        )}
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

        <Box mt={2.5} className={classes.login}>
          <Button
            type={loading ? "button" : "submit"}
            variant="contained"
            color="primary"
            size="large"
            className={classes.loginBtn}
          >
            {loading ? <Spinner /> : "Log In"}
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={() => setRemember(!remember)}
                checked={remember}
              />
            }
            label="Remember me"
            style={{ marginRight: 0 }}
          />
        </Box>
      </form>
      {loading && <LinearProgress />}
    </React.Fragment>
  );
};
