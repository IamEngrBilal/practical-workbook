import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button,Container } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Header from "./Header";
import Footer from "./Footer";
import classes from "./app.module.css";

const ViewTodo = () => {
  const [todo, setTodo] = useState([]);
  let completed = 1;
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:5000/todo/";

  useEffect(() => {
    getTodoById();
  }, []);

  const getTodoById = async () => {
    const allTodo = await axios.get(`${url}view/${id}`);
    setTodo(allTodo.data);
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${url}/delete/${id}`)
      .then((response) => {
        navigate("/todo")
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  const completeTodo = (id) => {
    axios
      .put(`${url}/complete/${id}`, {
        is_completed: completed,
      })
      .then((response) => {
        getTodoById();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
 
  return (
    <Container>
      <Header />
      <TableContainer sx={{ m: 2 }} component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead className={classes.table}>
            <TableRow>
              <TableCell align="left">TODO</TableCell>
              <TableCell align="left">STATUS</TableCell>
              <TableCell align="left">COMPLETED TIME</TableCell>
              <TableCell align="left">DATE CREATED</TableCell>
              <TableCell align="left">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: -1 } }}
            >
              <TableCell align="left">{todo.todo}</TableCell>
              <TableCell align="left">
                {todo.is_completed ? "Completed" : "Not Completed"}
              </TableCell>
              <TableCell align="left">{todo.completed_time}</TableCell>
              <TableCell align="left">{todo.create_time}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <DeleteForeverIcon />
                </Button>
                {"  "}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => completeTodo(todo.id)}
                >
                  <EventAvailableIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </Container>
  );
};

export default ViewTodo;
