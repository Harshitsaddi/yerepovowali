const request = require('supertest');
const app = require('../../src/app');

// we can mock repository to control DB responses
jest.mock('../../src/db/userRepository');
const userRepo = require('../../src/db/userRepository');

describe('users integration', () => {
  beforeEach(() => jest.clearAllMocks());

  test('GET /users returns users', async () => {
    userRepo.fetchAll.mockResolvedValue([{ id: '1', name: 'A', email: 'a@ex.com', password: 'x' }]);
    const res = await request(app).get('/users').expect(200);
    expect(res.body).toEqual({ success: true, data: [{ id: '1', name: 'A', email: 'a@ex.com' }] });
  });
});
