const TodoModel = require("./todo.model");

async function createTodo(req, res, next) {
  try {
    const todo = await TodoModel.create(req.body);
    return res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  createTodo
};
