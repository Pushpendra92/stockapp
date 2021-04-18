import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  usernamefield: {
    boxShadow: '0 0 0 100px #303030 inset'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    margin: theme.spacing(3, 0, 3),
    padding: theme.spacing(2, 0, 2),
  },
}));

export default function Login() {
  const [loginInfo, setLoginInfo] = useState(null);
  const history = useHistory()
  const classes = useStyles();

  // capture form values
  const changeHandler = (inputVal, evt) => {
    setLoginInfo((prevState) => {
      return { ...prevState, [inputVal]: evt.target.value };
    });
  };

  //sign in user and set accesstoken
  const signInHandler = async() => {
    await axios.post("http://localhost:8000/api/login/", loginInfo).then(
      (response) => {
        localStorage.setItem("isAdmin", JSON.stringify(response.data.isAdmin));
        localStorage.setItem("accessToken", JSON.stringify(response.data.access));
        history.push('/')
        window.location.reload()
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <TextField
        className= {classes.usernamefield}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="user"
          label="Username"
          name="user"
          onChange={(e) => changeHandler("username", e)}
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
          onChange={(e) => changeHandler("password", e)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signInHandler}
        >
          Login-in
        </Button>
      </div>
    </Container>
  );
}
