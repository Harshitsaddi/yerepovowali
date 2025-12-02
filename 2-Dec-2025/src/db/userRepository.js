// This simulates database access. In real life you'd query DB here.
const fakeUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com', password: 'secret' },
  { id: '2', name: 'Bob', email: 'bob@example.com', password: 'secret2' }
];

async function fetchAll() {
  // pretend async DB call
  return Promise.resolve(fakeUsers);
}

async function fetchById(id) {
  const u = fakeUsers.find(x => x.id === id);
  return Promise.resolve(u || null);
}

module.exports = { fetchAll, fetchById };
