import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const users = userService.getAllUsers();
      res.locals.data = users;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const newUser = userService.createUser(req.body);
      res.locals.data = newUser;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

export { router };
