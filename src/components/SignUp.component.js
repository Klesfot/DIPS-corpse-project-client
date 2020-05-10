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
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import requestPromise from "request-promise";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [redirectToSignIn, setRedirectToSignIn] = React.useState(false);
  const [first_name, setFirstName] = React.useState("");
  const [middle_name, setMiddleName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("Success!!!");
  const [failureMessage, setFailureMessage] = React.useState("Failure");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [passport_serias, setPassportSerias] = React.useState('');
  const [passport_number, setPassportNumber] = React.useState('');
  const handleRedirect = (event) => {
    setRedirectToSignIn(true);
  };
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPromise(
        "http://127.0.0.1:3002/api/authorization/signup",
        {
          method: "POST",
          body: {
            email,
            password,
            first_name,
            last_name,
            phone_number,
            middle_name,
            passport_serias,
            passport_number
          },
          json: true,
        }
      );
      setSuccessMessage("You have successfully signed up!");
      setOpenSuccess(true);
      setTimeout(() => {
        setRedirectToSignIn(true);
      }, 1000);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  return (
    <>
      {redirectToSignIn ? <Redirect to="/signin" /> : null}
      <Container component="main" maxWidth="xs">
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
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  label="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  label="Middle Name"
                  name="middle_name"
                  value={middle_name}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  label="Passport Serias"
                  value={passport_serias}
                  onChange={(e) => setPassportSerias(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  label="Passport Number"
                  value={passport_number}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleRedirect}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
