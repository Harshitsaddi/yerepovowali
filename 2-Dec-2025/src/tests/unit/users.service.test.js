const usersService = require('../../src/services/users.service');
// we'll mock the userRepository module that the service uses
jest.mock('../../src/db/userRepository');

const userRepo = require('../../src/db/userRepository');

describe('users.service', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getAll returns mapped users', async () => {
    // Arrange: mock fetchAll return value
    const fake = [
      { id: '1', name: 'A', email: 'a@ex.com', password: 'x' },
      { id: '2', name: 'B', email: 'b@ex.com', password: 'y' }
    ];
    userRepo.fetchAll.mockResolvedValue(fake);

    // Act
    const result = await usersService.getAll();

    // Assert
    expect(userRepo.fetchAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { id: '1', name: 'A', email: 'a@ex.com' },
      { id: '2', name: 'B', email: 'b@ex.com' }
    ]);
  });

  test('getById returns user when found', async () => {
    userRepo.fetchById.mockResolvedValue({ id: '1', name: 'A', email: 'a@ex.com', password: 'x' });

    const result = await usersService.getById('1');

    expect(userRepo.fetchById).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1', name: 'A', email: 'a@ex.com' });
  });

  test('getById returns null when not found', async () => {
    userRepo.fetchById.mockResolvedValue(null);
    const result = await usersService.getById('unknown');
    expect(result).toBeNull();
  });

  test('getById throws if id missing', async () => {
    await expect(usersService.getById()).rejects.toThrow('id required');
  });
});
