const { fetchAllTodo, fetchTodoByID } = require("../../models/todos.model.js");

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
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json(success);
}

module.exports = {
  httpFetchAllTodo,
  httpFetchTodoByID,
};
