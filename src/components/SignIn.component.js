import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import requestPromise from "request-promise";
import { Redirect } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.dark,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
});

export default function SignIn() {
  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("Success!!!");
  const [failureMessage, setFailureMessage] = React.useState("Failure");
  const [redirectToSignUp, setRedirectToSignUp] = React.useState(false);
  const [redirectToMain, setRedirectToMain] = React.useState(false);
  const [token, setToken] = React.useState("");
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };
  const handleCloseFailure = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailure(false);
  };
  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };
  const handleRedirect = (event) => {
    setRedirectToSignUp(true);
  };
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const result = await requestPromise(
        "http://127.0.0.1:3002/api/authorization/login",
        {
          method: "POST",
          body: {
            email,
            password,
          },
          json: true,
        }
      );
      setSuccessMessage("You have successfully loggged in");
      setToken(result.token);
      setTimeout(() => {
        setRedirectToMain(true);
      }, 1000);
      setOpenSuccess(true);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  return (
    <>
      {redirectToSignUp ? <Redirect to="/signup" /> : null}
      {redirectToMain ? (
        <Redirect
          to={{
            pathname: "/",
            state: { token },
          }}
        />
      ) : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color=""
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
            </Button>
            <Snackbar
              open={openSuccess}
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              key={"top,right"}
              onClose={handleCloseSuccess}
            >
              <Alert onClose={handleCloseSuccess} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={openFailure}
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              key={"top,right"}
              onClose={handleCloseFailure}
            >
              <Alert onClose={handleCloseFailure} severity="error">
                {failureMessage}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleRedirect}>
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
