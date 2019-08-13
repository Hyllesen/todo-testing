const TodoModel = require("./todo.model");

async function createTodo(req, res, next) {
  const todo = await TodoModel.create(req.body);
  return res.status(201).json(todo);
}

module.exports = {
  createTodo
};
