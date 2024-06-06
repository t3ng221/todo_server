const TodoItem = require("../schema/todoSchema");

const createTodoItem = async (data) => {
  const newTodoItem = new TodoItem(data);
  const createdTodoItem = await newTodoItem.save();
  return createdTodoItem;
};

const getAllTodoItems = async (userId) => {
  const todoItems = await TodoItem.find({ userId });
  return todoItems;
};

const getTodoItemById = async (todoItemId) => {
  const todoItem = await TodoItem.findOne({ _id: todoItemId });
  return todoItem;
};

const updateTodoItem = async (todoItemId, updateData) => {
  await TodoItem.updateOne({ _id: todoItemId }, { $set: updateData });
};

const deleteTodoItem = async (todoItemId) => {
  await TodoItem.deleteOne({ _id: todoItemId });
};

module.exports = {
  createTodoItem,
  getAllTodoItems,
  getTodoItemById,
  updateTodoItem,
  deleteTodoItem,
};
