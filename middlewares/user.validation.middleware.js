import { USER } from "../models/user.js";

const isValidEmail = (email) => {
  return typeof email === "string" && /^[\w.+-]+@gmail\.com$/.test(email);
};

const isValidPhone = (phone) => {
  return typeof phone === "string" && /^\+380\d{9}$/.test(phone);
};

const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 4;
};

const validFields = Object.keys(USER).filter((key) => key !== "id");

const createUserValid = (req, res, next) => {
  const body = req.body;

  for (const field of validFields) {
    if (!(field in body)) {
      return res.status(400).json({
        error: true,
        message: `Missing required field: ${field}`,
      });
    }
  }

  if (!isValidEmail(body.email)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email (must be a Gmail)" });
  }

  if (!isValidPhone(body.phone)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid phone format" });
  }

  if (!isValidPassword(body.password)) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 4 characters" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const body = req.body;

  if (body.email && !isValidEmail(body.email)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email (must be a Gmail)" });
  }

  if (body.phone && !isValidPhone(body.phone)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid phone format" });
  }

  if (body.password && !isValidPassword(body.password)) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 4 characters" });
  }

  next();
};

export { createUserValid, updateUserValid };
