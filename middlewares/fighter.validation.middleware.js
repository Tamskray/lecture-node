import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const body = req.body;
  const { power, defense, health } = body;

  if (typeof power !== "number" || power < 1 || power > 100) {
    return res
      .status(400)
      .json({ error: true, message: "Power must be a number from 1 to 100" });
  }

  if (typeof defense !== "number" || defense < 1 || defense > 10) {
    return res
      .status(400)
      .json({ error: true, message: "Defense must be a number from 1 to 10" });
  }

  if (
    health !== undefined &&
    (typeof health !== "number" || health < 80 || health > 120)
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Health must be a number from 80 to 120" });
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  const body = req.body;

  const receivedKeys = Object.keys(body);

  if (receivedKeys.length === 0) {
    return res
      .status(400)
      .json({ error: true, message: "At least one field must be provided" });
  }

  if (
    receivedKeys.includes("id") ||
    receivedKeys.some((key) => !allowedKeys.includes(key))
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Fighter entity to update isn’t valid" });
  }

  if (
    body.power !== undefined &&
    (typeof body.power !== "number" || body.power < 1 || body.power > 100)
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Power must be a number from 1 to 100" });
  }

  if (
    body.defense !== undefined &&
    (typeof body.defense !== "number" || body.defense < 1 || body.defense > 10)
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Defense must be a number from 1 to 10" });
  }

  if (
    body.health !== undefined &&
    (typeof body.health !== "number" || body.health < 80 || body.health > 120)
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Health must be a number from 80 to 120" });
  }

  next();
};

export { createFighterValid, updateFighterValid };
