// const db = require('../dbConfig');
// const { findBy, add } = require('./authModel');
// const user = require('../seeds/01_users'); // imports seed data as 'user.const'
// test.todo('not fail')
test.todo('not fail')
// describe('authorization', () => {
  // describe('findBy', () => {
  //   test('find user by username and receive user object', async () => {
  //     const username = 'Bill';
  //     const user = await findBy(username)
  //     // console.log(user)
  //     expect(user.username).toBe('Bill')
  //     expect(user.last_name).toBe('Bill')
  //     expect(user.first_name).toBe('Bill')
  //     expect(user.role).toBe('volunteer')
  //   })
  // })
  
//   describe('add', () => {
//     beforeEach(async () => { // CAN NOT TRUNCATE SINCE DATA BECAUSE OF FOREIGN KEY CONSTRAINT
//       await db('users').truncate();
//       await db('users').insert(user.const)
//     });
//     test('add new user to db', async () => {
//       await add({
//         username: 'Bill',
//         last_name: 'Bill',
//         first_name: 'Bill',
//         password: '$2b$10$FqLjG/OE3j2DMLByNRjcE.5/rjPWeqCw99Y0ExnIRSDZeafwQPnru',
//         role: 'volunteer'
//       })
//       const user = await db('users')
//       expect(user).toHaveLength(6)
//     })
//   })
// });