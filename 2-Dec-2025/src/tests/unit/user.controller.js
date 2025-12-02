const usersController = require('../../src/controllers/users.controller');
const usersService = require('../../src/services/users.service');

jest.mock('../../src/services/users.service');

describe('users.controller', () => {
  let req, res;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  test('getAllUsers returns success response', async () => {
    usersService.getAll.mockResolvedValue([{ id: '1', name: 'A', email: 'a@ex.com' }]);
    await usersController.getAllUsers(req, res);

    expect(usersService.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ success: true, data: [{ id: '1', name: 'A', email: 'a@ex.com' }] });
  });

  test('getUserById returns 404 if not found', async () => {
    req.params = { id: '5' };
    usersService.getById.mockResolvedValue(null);

    await usersController.getUserById(req, res);

    expect(usersService.getById).toHaveBeenCalledWith('5');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
  });

  test('getUserById returns 500 on service error', async () => {
    req.params = { id: '1' };
    usersService.getById.mockRejectedValue(new Error('db down'));

    await usersController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
});
