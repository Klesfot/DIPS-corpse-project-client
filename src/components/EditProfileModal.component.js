import React, { useImperativeHandle, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import requestPromise from "request-promise";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "60px",
    height: "60px",
    backgroundColor: "#3F51B5",
    color: "white",
  },
  fixedHeight: {
    height: "100%",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  form : {
    paddingTop: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
}));

export default function SimpleModal(props) {
  const { user, handleOpen, open, token, updateList } = props;
  console.log(user);
  const classes = useStyles();
  const [user_id, setUserId] = React.useState(user._id);
  const [first_name, setFirstName] = React.useState(user.first_name || "");
  const [middle_name, setMiddleName] = React.useState(user.middle_name || "");
  const [last_name, setLastName] = React.useState(user.last_name || "");
  const [email, setEmail] = React.useState(user.email);
  const [new_password, setNewPassword] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState(
    user.phone_number || ""
  );
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("Success!!!");
  const [failureMessage, setFailureMessage] = React.useState("Failure");
  const [passport_serias, setPassportSerias] = React.useState(
    user.passport_serias || ""
  );
  const [passport_number, setPassportNumber] = React.useState(
    user.passport_number || ""
  );
  const handleClose = () => {
    handleOpen(false);
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
  useEffect(() => {
    setUserId(user._id);
    setFirstName(user.first_name);
    setMiddleName(user.middle_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setPhoneNumber(user.phone_number);
    setPassportSerias(user.passport_serias);
    setPassportNumber(user.passport_number);
  }, [
    user._id,
    user.first_name,
    user.middle_name,
    user.last_name,
    user.email,
    user.phone_number,
    user.passport_serias,
    user.passport_number,
  ]);
  const editPassword = async () => {
    try {
      await requestPromise("http://127.0.0.1:3002/api/admin/password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          user_id,
          new_password,
        },
        json: true,
      });
      setSuccessMessage("You have successfully edited user's password");
      setOpenSuccess(true);
      handleOpen(false);
      await updateList();
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const editProfile = async () => {
    try {
      await requestPromise("http://127.0.0.1:3002/api/admin", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          user_id,
          last_name,
          middle_name,
          first_name,
          email,
          phone_number,
          passport_serias,
          passport_number,
        },
        json: true,
      });
      setSuccessMessage("You have successfully changed user's profile");
      setOpenSuccess(true);
      handleOpen(false);
      await updateList();
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant={"outlined"}
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
        onClose={handleCloseFailure}
      >
        <Alert onClose={handleCloseFailure} severity="error">
          {failureMessage}
        </Alert>
      </Snackbar>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Container maxWidth="xs" className={classes.container}>
            <Grid container spacing={1}>
              {/* Chart */}
              <Grid item xs={6} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  <Avatar className={classes.icon}>
                    {first_name && last_name
                      ? `${first_name.slice(0, 1)}${last_name.slice(0, 1)}`
                      : "U"}
                  </Avatar>
                  <form className={classes.form}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="First Name"
                          name="first_name"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
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
                          variant="outlined"
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
                          variant="outlined"
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
                          variant="outlined"
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
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Passport Serias"
                          value={passport_serias}
                          onChange={(e) => setPassportSerias(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Passport Number"
                          value={passport_number}
                          onChange={(e) => setPassportNumber(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          name="password"
                          label="New password(not required)"
                          type="password"
                          id="password"
                          autoComplete="password"
                          value={new_password}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </form>
                  <Button
                    variant="contained"
                    className={classes.submitButton}
                    onClick={async (e) => {
                      e.preventDefault();
                      await editProfile();
                      if (new_password) await editPassword();
                    }}
                  >
                    Edit profile
                  </Button>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
            </Grid>
          </Container>
        </Modal>
      </div>
    </>
  );
}
