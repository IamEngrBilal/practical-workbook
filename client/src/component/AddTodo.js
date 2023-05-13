import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import classes from "./app.module.css";
import Alert from "@mui/material/Alert";


const theme = createTheme();

const AddTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [list, setList] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [err, setErr] = useState();
  const url = "http://localhost:3000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo) {
      setError("Input required");
      setErr(true);
    }

    const allTodo = await axios
      .post(`${url}/create`, {
        todo: todo,
      })
      .then((response) => {
        const allTodo = response.data;
        if (allTodo) {
          console.log("Create");
          navigate("/todo");
        }
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography
              sx={{ m: 2 }}
              variant="h6"
              component="h4"
              color="primary"
            >
              New Todo
            </Typography>
            <p>{err ? <Alert severity="error">{error}</Alert> : null}</p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="todo"
                  required
                  fullWidth
                  id="todo"
                  label="Enter a todo"
                  autoFocus
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default AddTodo;
