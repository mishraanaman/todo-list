const todos = require('./todos.mongo')
let todo =['play', 'fun']
//Given no parameters, return all the TODO
function fetchAllTodo() {
  const response = todos.find({}, { _id: 0, __v: 0 }).sort({ todoNumber: 1 });
  return response;
}

function fetchTodoByID(id) {
  const obj = {
    todoNumber : id
  }
  const response = todos.findOne(obj, { _id: 0, __v: 0 });
  return response;
}

async function createTodo(obj){
    const response = await todos.create(obj);
    return response;
}

function removeTodoByID(id) {
    const obj = {
      todoNumber: id,
    };
    const response = todos.deleteOne(obj);
    return response;
}


module.exports = {
  fetchAllTodo,
  createTodo,
  fetchTodoByID,
  removeTodoByID,
};