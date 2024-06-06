const { errorResponseHandler } = require("../helper/errorResponseHandler");
const TODO = require("../models/todoItem");

const getTodos = async (req, res) => {
  try {
    const { userId } = req.user;
    const todos = await TODO.getAllTodoItems(userId);
    res.success(todos, "All Todo Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getTodosByEmail = async (req, res) => {
  try {
    const { email } = req.user;  
    const todos = await TODO.getAllTodoItems(email);
    res.success(todos, "All Todo Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};


const addTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { userId } = req.user;
    const todo = await TODO.createTodoItem({
      title,
      description,
      completed,
      userId,
    });
    console.log(todo);
    res.success(todo, "Todo Created Successfully");
  } catch (error) {
    errorResponseHandler(error, req, res);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = req.params.todoId;
    const updatedTodo = await TODO.updateTodoItem(todoId, {
      title,
      description,
      completed,
    });
    res.success(updatedTodo, "Todo Updated Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const removeTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    await TODO.deleteTodoItem(todoId);
    res.success(todoId, "Delete Successful");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  getTodos,
  updateTodo,
  removeTodo,
  addTodo,
};
