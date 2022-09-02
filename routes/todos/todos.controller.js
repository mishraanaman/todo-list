const { fetchAllTodo, fetchTodoByID, createTodo, removeTodoByID} = require("../../models/todos.model.js");
const { create } = require("../../models/todos.mongo.js");

async function httpFetchAllTodo(req, res) {
  const success = await fetchAllTodo();
  //console.log("success", success);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json(success);
}

async function httpFetchTodoByID(req, res) {
  const id = req.params.id;

  const success = await fetchTodoByID(id);
  if (!success) {
    return res.status(400).json({
      error: "TODO not found for this ID",
    });
  }

  return res.status(200).json(success);
}

async function httpCreateTodo(req, res) {
  const todoNumber = req.body.todoNumber;
  const date = req.body.date;
  const description = req.body.description;
  const completed = req.body.completed;

  if(!todoNumber || !date || !description || (!completed && completed != false)){
    return res.status(400).json({
        error: 'Missing TODO property'
    })
  }

  let dateObj = new Date(date);
  if (isNaN(dateObj.valueOf())) {
    return res.status(400).json({
      error: "Invalid Date Property",
    });
  }

  const obj = {
    todoNumber : todoNumber,
    date : date,
    description : description,
    completed : completed
  }

  const success = await createTodo(obj);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }
  return res.status(201).json(success);
}


async function httpRemoveTodoByID(req, res) {
  const id = req.params.id;

  const todo = await fetchTodoByID(id);
  let success ={}  
  if (todo) {
    success = await removeTodoByID(id);
    if (!success) {
      return res.status(400).json({
        error: "Please contact IT Support",
      });
    }
  } else
    return res.status(400).json({
      error: "TODO not found for this ID",
    });

  return res.status(200).json(success);
}

module.exports = {
  httpFetchAllTodo,
  httpFetchTodoByID,
  httpCreateTodo,
  httpRemoveTodoByID,
  
};
