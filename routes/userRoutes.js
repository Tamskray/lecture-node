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

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const user = userService.getUserById(req.params.id);
      res.locals.data = user;
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

router.patch(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    try {
      const updated = userService.updateUser(req.params.id, req.body);
      console.log(req.params.id, req.body);
      res.locals.data = updated;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const deleted = userService.deleteUser(req.params.id);
      res.locals.data = deleted;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

export { router };
