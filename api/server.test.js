const request = require('supertest');
const server = require('./server');

describe('server', () => {
  describe('environment', () => {
    test("should set db environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  })

  describe('GET /', () => {
    test('status 200 OK', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200); 
        })
    })

    test('should receive JSON formatted response', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect (res.type).toMatch(/json/i);
        })
    })

    test('receive correct rs body', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect (res.body).toMatch('Hello World')
        })
    })
  })
})