const userRepo = require('../db/userRepository');

async function getAll() {
  // business logic can go here
  const users = await userRepo.fetchAll();
  // e.g., remove sensitive fields (example)
  return users.map(u => ({ id: u.id, name: u.name, email: u.email }));
}

async function getById(id) {
  if (!id) throw new Error('id required');
  const user = await userRepo.fetchById(id);
  return user ? { id: user.id, name: user.name, email: user.email } : null;
}

module.exports = { getAll, getById };
