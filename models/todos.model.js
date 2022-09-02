let todo =['play', 'fun']
//Given no parameters, return all the TODO
function fetchAllTodo() {
  const response = JSON.stringify(todo);
  return response;
}


module.exports = {
  fetchAllTodo
};