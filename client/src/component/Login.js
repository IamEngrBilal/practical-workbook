/** @format */

import { useContext, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright � "}
      <Link color="inherit" href="#">
        Northino
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [sucess, setSucess] = useState();
  const [error, setError] = useState();
  const [userContext, setUserContext] = useContext(UserContext);
  const url = "http://localhost:5000/account";
  const navigate = useNavigate();
  let suc = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    try {
      const response = await axios.post(`${url}/login`, {
        username: data.get("username"),
        userpassword: data.get("password"),
      });
      if (response.status === 200) {
        console.log("Login successfully");
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        const token = response?.data?.token;
        setUserContext(oldValues => {
         return {...oldValues, token: response.token}
       })
        setSuccessMsg("Login Successfully");
        setSucess("Success");
        setUsername("");
        setUserpassword("");
        setSucess(true);
        // navigate("/todo")
        //alert("Login Successfully")
      }
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("*Invalid output");
        setErrMsg("Invalid input");
        setError("Error");
      } else if (err.response?.status === 401) {
        console.log("Incorrect credentials");
        setErrMsg("*Incorrect credentials");
        setError("Error");
      } else if (err.response?.status === 404) {
        console.log("User Not Found");
        setErrMsg("User Not Found");
        setError("Error");
      } else {
        console.log("Login failed");
        setErrMsg("Login failed");
        setError("Error");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div>
      {sucess ? (
        navigate("/todo")
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(/images/todo.jpeg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1 }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}>
                  <p>
                    {error ? <Alert severity="error">{errMsg}</Alert> : null}
                  </p>
                  <p>
                    {sucess ? (
                      <Alert severity="success">{successMsg}</Alert>
                    ) : null}
                  </p>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="./signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Login;
