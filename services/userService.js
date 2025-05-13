import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");
    return user;
  }

  createUser(data) {
    //
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

  updateUser(id, data) {
    const existingUser = userRepository.getOne({ id });
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (data.email && data.email !== existingUser.email) {
      if (userRepository.existsByEmail(data.email)) {
        throw new Error("Email already exists");
      }
    }

    if (data.phone && data.phone !== existingUser.phone) {
      if (userRepository.existsByPhone(data.phone)) {
        throw new Error("Phone already exists");
      }
    }

    return userRepository.update(id, data);
  }

  deleteUser(id) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");
    return userRepository.delete(id);
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
