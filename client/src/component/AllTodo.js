/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Table, Container } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import classes from "./app.module.css";
import Header from "./Header";
import Footer from "./Footer";

const AllTodo = () => {
  const [list, setList] = useState([]);
  let completed = 1;
  const url = "http://localhost:3000/api";

  useEffect(() => {
    getAllTodo();
  }, []);

  const getAllTodo = () => {
    axios
      .get(`${url}/read`)
      .then((response) => {
        const allTodo = response.data;
        setList(allTodo);
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
              <TableCell>S/N</TableCell>
              <TableCell align="left">TODO</TableCell>
              <TableCell align="left">ACTIONS</TableCell>
              <TableCell align="left">
                <Link to="/add-todo">
                  <NoteAddIcon fontSize="large" />
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(list).map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: -1 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{todo.todo}</TableCell>
                <TableCell align="left">
                  <Link to={`/edit/${todo.id}`}>
                    <EditIcon fontSize="medium" />
                  </Link>{" "}
                  <Link to={`/todo-per-day/${todo.id}`}>
                    <VisibilityIcon fontSize="medium" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </Container>
  );
};

export default AllTodo;
