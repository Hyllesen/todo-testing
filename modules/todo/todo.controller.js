const TodoModel = require("./todo.model");

async function createTodo(req, res, next) {
  try {
    await TodoModel.create(req.body);
    return res.status(201).send({ TodoModel });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  createTodo
};
