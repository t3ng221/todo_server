const { Router } = require("express");
const { userAuthenticate } = require("../middlewares/authenticate");
const {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
} = require("../controllers/todoItem.controller");

const router = Router();

router.get("/alltodo", userAuthenticate, getTodos);
router.post("/add", userAuthenticate, addTodo);
router.put("/update/:todoId", userAuthenticate, updateTodo);
router.delete("/delete/:todoId", userAuthenticate, removeTodo);

module.exports = router;
