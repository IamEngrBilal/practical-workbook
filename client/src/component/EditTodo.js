/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Header from "./Header";
import Footer from "./Footer";

import classes from "./app.module.css";

const theme = createTheme();

const EditTodo = () => {
  const [todo, setTodo] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:3000/api/";

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios.put(`${url}edit/${id}`, {
        todo: todo,
      });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/todo");
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${url}view/${id}`);
      setTodo(response.data.todo);
    })();
  }, []);

  const getTodoById = async () => {};

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
          }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}>
            <Typography
              sx={{ m: 2 }}
              variant="h6"
              component="h4"
              color="primary">
              Update Todo
            </Typography>
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
              sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default EditTodo;
