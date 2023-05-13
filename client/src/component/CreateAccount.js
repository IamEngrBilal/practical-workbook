/** @format */

import { useContext, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [suc, setSuc] = useState(false);
  const [error, setError] = useState(false);
  const url = "http://localhost:3000/api";
  const [userContext, setUserContext] = useContext(UserContext);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}>
        {"Copyright � "}
        <Link color="inherit" href="#">
          Todo App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    setUsername(data.get("username"));
    setUserpassword(data.get("password"));

    console.log(fullname, phonenumber, email, username, userpassword);

    try {
      const response = await axios.post(`${url}/register`, {
        username: username,
        password: userpassword,
      });
      if (response.status === 200) {
        console.log("Account created");
        setSuccess(
          `Your account was created successfully.`
        );
        console.log(response);
        setSuc(true);
      }
      setUsername("");
      setUserpassword("");
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("Invalid output");
        setErrMsg("Invalid input");
        setError(true);
      } else if (err.response?.status === 401) {
        console.log("User Already exist");
        setErrMsg("User Already Exist");
        setError(true);
      } else {
        console.log("Registration failed");
        setErrMsg("Registration failed");
        setError(true);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <p>{error ? <Alert severity="error">{errMsg}</Alert> : null}</p>
            <p>{suc ? <Alert severity="success">{success}</Alert> : null}</p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="new-username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree & accept the terms and condition to create an account with this platform."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default CreateAccount;
