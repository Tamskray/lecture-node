import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const fighters = fighterService.getAllFighters();
      res.locals.data = fighters;
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
      const fighter = fighterService.getFighterById(req.params.id);
      res.locals.data = fighter;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const fighter = fighterService.create(req.body);
      res.locals.data = fighter;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      const updated = fighterService.update(req.params.id, req.body);
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
      const deleted = fighterService.delete(req.params.id);
      res.locals.data = deleted;
      next();
    } catch (err) {
      next(err);
    }
  },
  responseMiddleware
);

export { router };
