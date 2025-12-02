const usersService = require('../services/users.service');

async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAll();
    return res.json({ success: true, data: users });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await usersService.getById(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getAllUsers, getUserById };
