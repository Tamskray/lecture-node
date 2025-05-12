import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }
  existsByEmail(email) {
    const allUsers = this.getAll();
    return allUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  existsByPhone(phone) {
    const allUsers = this.getAll();
    return allUsers.some((user) => user.phone === phone);
  }
}

const userRepository = new UserRepository();

export { userRepository };
