/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SvgIcon from "@material-ui/core/SvgIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Avatar from "@material-ui/core/Avatar";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import requestPromise from "request-promise";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditProfileModal from "./EditProfileModal.component";
import SecurityIcon from "@material-ui/icons/Security";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#808080",
  },
  toolbar: {
    backgroundColor: "#1c9a2b",
    paddingRight: 100, // keep right padding when drawer closed
  },
    color: "#808080",
    backgroundColor: "#808080",
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 60,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    marginLeft: "30px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(10),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  icon: {
    width: "80px",
    height: "40px",
    backgroundColor: "#48a92a",
    color: "white",
  },
  form: {
    // width: "50%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "#696969",
  },
  fixedHeight: {
    height: "100%",
  },
  submitButton: {
    width: "30%",
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: "80px",
    height: "40px",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [middle_name, setMiddleName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState("");
  const [redirectToSignIn, setRedirectToSignIn] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("Success!!!");
  const [failureMessage, setFailureMessage] = React.useState("Failure");
  const [old_password, setOldPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMain, setIsMain] = React.useState(true);
  const [allUsersInfo, setAllUserInfo] = React.useState([]);
  const [openEditProfileModal, setOpenEditProfileModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditPassword, setIsEditPassword] = React.useState(false);
  const [passport_serias, setPassportSerias] = React.useState('');
  const [passport_number, setPassportNumber] = React.useState('');
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

  const deleteUser = async (id) => {
    try {
      await requestPromise("http://127.0.0.1:3002/api/admin", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.location.state.token}`,
        },
        qs: {
          user_id: id,
        },
        json: true,
      });
      setSuccessMessage("User has been removed from the database");
      setOpenSuccess(true);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const editPassword = async (event) => {
    event.preventDefault();
    try {
      await requestPromise("http://127.0.0.1:3002/api/user/password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${props.location.state.token}`,
        },
        body: {
          old_password,
          new_password,
        },
        json: true,
      });
      setSuccessMessage("Profile changes applied");
      setOpenSuccess(true);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const editProfile = async (event) => {
    event.preventDefault();
    try {
      await requestPromise("http://127.0.0.1:3002/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${props.location.state.token}`,
        },
        body: {
          last_name,
          middle_name,
          first_name,
          email,
          phone_number,
          passport_number,
          passport_serias
        },
        json: true,
      });
      setSuccessMessage("Profile changes applied");
      setOpenSuccess(true);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const updateList = async () => {
    try {
      const users = await requestPromise("http://127.0.0.1:3002/api/admin/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.location.state.token || token}`,
        },
        json: true,
      });
      setAllUserInfo(users);
    } catch (err) {
      setFailureMessage(err.message);
      setOpenFailure(true);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    // update doc header using API
    if (!props.location.state || !props.location.state.token) {
      setFailureMessage("You are not authorised!");
      setOpenFailure(true);
      setTimeout(() => {
        setRedirectToSignIn(true);
      }, 1000);
    } else {
      setToken(props.location.state.token);
      requestPromise("http://127.0.0.1:3002/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.location.state.token}`,
        },
        json: true,
      })
        .then((result) => {
          setFirstName(result.first_name);
          setMiddleName(result.middle_name);
          setLastName(result.last_name);
          setEmail(result.email);
          setPhoneNumber(result.phone_number);
          setPassportNumber(result.passport_number);
          setPassportSerias(result.passport_serias);
        })
        .catch((err) => {
          setFailureMessage(err.message);
          setOpenFailure(true);
        });
      requestPromise("http://127.0.0.1:3002/api/authorization/token/check", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.location.state.token || token}`,
        },
        json: true,
      })
        .then((result) => {
          setIsAdmin(result.isAdmin);
          if (result.isAdmin) {
            requestPromise("http://127.0.0.1:3002/api/admin/", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${props.location.state.token || token}`,
              },
              json: true,
            }).then((result) => {
              setAllUserInfo(result);
            });
          }
        })
        .catch((err) => {
          setFailureMessage(err.message);
          setOpenFailure(true);
        });
    }
  }, []);
  return (
    <>
      <EditProfileModal
        open={openEditProfileModal}
        handleOpen={setOpenEditProfileModal}
        user={currentUser}
        token={token}
        updateList={updateList}
      />
      {redirectToSignIn ? <Redirect to="/signin" /> : null}
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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              onClick={() => {
                setIsMain(true);
                setIsEditPassword(false);
              }}
            >
              <Badge
                color="secondary"
                onClick={() => {
                  setIsMain(true);
                  setIsEditPassword(false);
                }}
              >
                <HomeIcon />
              </Badge>
              <Typography
                onClick={() => {
                  setIsMain(true);
                  setIsEditPassword(false);
                }}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                IdeaBank
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                setIsMain(true);
                setIsEditPassword(true);
              }}
            >
              <Badge
                color="secondary"
                onClick={() => {
                  setIsMain(true);
                  setIsEditPassword(true);
                }}
              >
                <SecurityIcon />
              </Badge>
              <Typography
                onClick={() => {
                  setIsMain(true);
                  setIsEditPassword(true);
                }}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Change account password
              </Typography>
            </IconButton>
            {isAdmin ? (
              <IconButton
                onClick={() => {
                  setIsMain(false);
                  setIsEditPassword(false);
                }}
                color="inherit"
              >
                <Badge
                  onClick={() => {
                    setIsMain(false);
                    setIsEditPassword(false);
                  }}
                  color="secondary"
                >
                  <AssignmentIcon
                    onClick={() => {
                      setIsMain(false);
                      setIsEditPassword(false);
                    }}
                  />
                </Badge>
                <Typography
                  onClick={() => {
                    setIsMain(false);
                    setIsEditPassword(false);
                  }}
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  User Administration
                </Typography>
              </IconButton>
            ) : null}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            ></Typography>
            <IconButton
              color="inherit"
              onClick={() => setRedirectToSignIn(true)}
            >
              <Badge
                color="secondary"
                onClick={() => setRedirectToSignIn(true)}
              >
                <ExitToAppIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {isMain ? (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {isEditPassword ? (
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography
                        component="h1"
                        variant="h5"
                        className={classes.form}
                      >
                        Password change:
                      </Typography>
                      <form className={classes.form}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="old_password"
                              label="Old password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={old_password}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="New password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={new_password}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </form>
                      <Button
                        variant="contained"
                        className={classes.submitButton}
                        onClick={editPassword}
                      >
                        Apply password change
                      </Button>
                    </Paper>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                      <Avatar className={classes.icon}>
                        {first_name && last_name
                          ? `${first_name.slice(0, 1)}${last_name.slice(0, 1)}`
                          : "U"}
                      </Avatar>
                      <Typography
                        component="h1"
                        variant="h5"
                        className={classes.form}
                      >
                        Account information:
                      </Typography>

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
                              label="Mobile Phone Number"
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
                              label="Passport Serial Code"
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
                        </Grid>
                      </form>
                      <Button
                        variant="outlined"
                        className={classes.submitButton}
                        onClick={editProfile}
                      >
                        Apply profile changes
                      </Button>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Container>
          </main>
        ) : (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper className={fixedHeightPaper}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>UID</TableCell>
                            <TableCell>FN</TableCell>
                            <TableCell align="center">LN</TableCell>
                            <TableCell align="center">MN</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Serial Number</TableCell>
                            <TableCell align="center">Passport Number</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {allUsersInfo.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.first_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.last_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.middle_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.phone_number}
                              </TableCell>
                              <TableCell align="center">
                                {row.passport_serias}
                              </TableCell>
                              <TableCell align="center">
                                {row.passport_number}
                              </TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup
                                  color="primary"
                                  aria-label="outlined primary button group"
                                >
                                  <Button
                                    onClick={async () => {
                                      setCurrentUser(row);
                                      setOpenEditProfileModal(true);
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    onClick={async () => {
                                      await deleteUser(row._id);
                                      await updateList();
                                    }}
                                  >
                                    <DeleteIcon
                                      onClick={async () => {
                                        await deleteUser(row._id);
                                        await updateList();
                                      }}
                                    />
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        )}
      </div>
    </>
  );
}
