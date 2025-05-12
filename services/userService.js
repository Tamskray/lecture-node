import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  createUser(data) {
    if (userRepository.existsByEmail(data.email)) {
      throw new Error("Email already exists");
    }

    if (userRepository.existsByPhone(data.phone)) {
      throw new Error("Phone already exists");
    }

    return userRepository.create({
      ...data,
      email: data.email.toLowerCase(),
    });
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
