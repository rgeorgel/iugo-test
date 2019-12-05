const server = require('../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Timestamp endpoint', () => {
  test('Get a current timestamp', async (done) => {
     request.get('/Timestamp')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const isNumber = !isNaN(res.body.Timestamp);
        expect(isNumber).toEqual(true);

        done();
      });
  });
});