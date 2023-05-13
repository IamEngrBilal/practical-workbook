const router = require('express').Router();
const Todo = require("../models/Todo");


router.post('/create', (req, res) => {

  if (!req.body.todo ) {
    return res.status(400).send({ message: "Inputs cannot be empty" });
  }

  const addTodo = new Todo({
    todo: req.body.todo,
  });

  addTodo.save((err, todo) => {
    if (err) {
      res.send(err)
    } else {
      res.send(todo)
    }
  })
  

})

router.get('/read', (req,res)=>{
  Todo.find({}, (err, findTodos) => {
    if (!err) {
      res.send(findTodos);
    }
  });
})

router.get('/read/:id', (req, res) => {
  const id = req.params.id;
  
  Todo.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send(
          { message: `Todo not found` });
      } else {
        res.send(data)
    }
    })
    .catch(err => {
    res.status(500).send({message: "Error"})
  })
    
  })


router.put('/update/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send(
          { message: `Cannot update todo with id ${id}. todo not found` });
      } else {
        res.send({message: "Updated successfully"})
    }
    })
    .catch(err => {
    res.status(500).send({message: "Error updating record"})
  })
  
})

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send(
          { message: `Cannot delete record with id ${id}. Record not found` });
      } else {
        res.send({message: "Deleted successfully"})
    }
    })
    .catch(err => {
    res.status(500).send({message: "Error deleting todo"})
    })
  
  
  
})


module.exports = router;