import { Routes, Route } from "react-router-dom";
import AddTodo from "./component/AddTodo";
import AllTodo from "./component/AllTodo";
import EditTodo from "./component/EditTodo";
import ViewTodo from "./component/ViewTodo";
import CreateAccount from "./component/CreateAccount";
import Login from "./component/Login";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/add-todo" element={<AddTodo />}></Route>
        <Route path="/todo" element={<AllTodo />}></Route>
        <Route path="/edit/:id" element={<EditTodo />}></Route>
        <Route path="/todo-per-day/:id" element={<ViewTodo />}></Route>
        <Route path="/signup" element={<CreateAccount />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
