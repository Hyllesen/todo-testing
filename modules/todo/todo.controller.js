const TodoModel = require("./todo.model");

function createTodo() {
  TodoModel.create();
}

module.exports = {
  createTodo
};
