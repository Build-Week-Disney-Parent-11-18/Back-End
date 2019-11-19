const db = require('../dbConfig');
const { findBy, add } = require('./authModel');
const user = require('../seeds/01_users'); // imports seed data as 'user.const'

describe('authorization', () => {
  beforeEach(async () => { 
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await db('users').insert(user.const)
  });
  
  describe('findBy', () => {
    test('find user by username and receive user object', async () => {
      const username = 'RMartin';
      const user = await findBy(username)
      // console.log(user)
      expect(user.id).toBe(4)
      expect(user.username).toBe('RMartin')
      expect(user.last_name).toBe('Martin')
      expect(user.first_name).toBe('Roy')
      expect(user.role).toBe('parent')
    })
  })
  
  describe('add', () => {
    
    test('add new user to db', async () => {
      await add({
        username: 'usernameModelTest',
        last_name: 'last_name',
        first_name: 'first_name',
        password: '$2b$10$V/5b9lQqZ21ft9QZs1n14eK0n4TWj9w.Q5guteELc7lEbAV1I.XEa',
        role: 'role'
      })
      const user = await db('users')
      expect(user).toHaveLength(6)
    })
  })
});