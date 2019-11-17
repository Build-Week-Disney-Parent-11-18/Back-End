const db = require('../dbConfig');
const { findBy, add } = require('./authModel');
const user = require('../seeds/01_users'); // imports seed data as 'user.const'


describe('authorization', () => {
  
  describe('findBy', () => {
    test('find user by username and receive user object', async () => {
      const username = 'Bill';
      const user = await findBy(username)
      console.log(user)
      expect(user.username).toBe('Bill')
      expect(user.last_name).toBe('Bill')
      expect(user.first_name).toBe('Bill')
      expect(user.role).toBe('volunteer')
    })
  })
  
  describe('add', () => {
    beforeEach(async () => { // CAN NOT TRUNCATE SINCE DATA BECAUSE OF FOREIGN KEY CONSTRAINT
      await db('users').del();
    });
    test('add new user to db', async () => {
      await add({
        username: 'Bill',
        last_name: 'Bill',
        first_name: 'Bill',
        password: 'Bill',
        role: 'volunteer'
      })
      const user = await db('users')
      expect(user).toHaveLength(1)
    })
  })
})