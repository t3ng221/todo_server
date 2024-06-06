const express = require("express");
const router = express.Router();
const userRoute = require("./auth.route");
const todoItemRoute = require("./todoItem.route");

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/todo",
    route: todoItemRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
