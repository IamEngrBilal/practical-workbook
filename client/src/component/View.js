import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import classes from "./app.module.css";

const ViewTodo = () => {
  const [todo, setTodo] = useState([]);
  let completed = 1;
  const { id } = useParams();
  const url = "http://localhost:5000/todo/";

  useEffect(() => {
    (async () => {
      const allTodo = await axios.get(`${url}view/${id}`);
       setTodo(allTodo.data);
    })()
  }, []);

  const getTodoById = async () => {

   
  };

  console.log(todo);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="left">Todo</TableCell>
              <TableCell align="left">Is Completed</TableCell>
              <TableCell align="left">Complete time</TableCell>
              <TableCell align="left">Date created</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(todo).map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: -1 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{todo.todo}</TableCell>
                <TableCell align="left">
                  {todo.is_completed ? "Yes" : "No"}
                </TableCell>
                <TableCell align="left">{todo.completed_time}</TableCell>
                <TableCell align="left">{todo.create_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewTodo;
