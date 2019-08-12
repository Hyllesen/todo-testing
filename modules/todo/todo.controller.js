const TodoModel = require("./todo.model");

function createTodo(todo) {
  TodoModel.create(todo);
}

module.exports = {
  createTodo
};
