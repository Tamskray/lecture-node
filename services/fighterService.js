import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }
  getFighterById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");
    return fighter;
  }

  create(data) {
    const existing = fighterRepository.getOne({
      name: data.name.toLowerCase(),
    });

    if (existing) {
      throw new Error("Fighter with this name already exists");
    }

    const fighter = {
      ...data,
      name: data.name.toLowerCase(),
      health: data.health ?? 85,
    };

    return fighterRepository.create(fighter);
  }

  update(id, data) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");

    if (data.name) {
      const existing = fighterRepository.getOne({
        name: data.name.toLowerCase(),
      });
      if (existing && existing.id !== id) {
        throw new Error("Fighter with this name already exists");
      }
      data.name = data.name.toLowerCase();
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }

    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
