const server = require('../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose')

beforeAll(async () => {
  const url = `mongodb://iugo:iugo@localhost:27017/admin?ssl=false`;
  await mongoose.connect(url, { useNewUrlParser: true });
})

describe('UserSave endpoint', () => {
  test('Save user data', async (done) => {
    const userData = {
      "UserId": 1,
      "Data": {
        "Piece1": {
          "SubData": 1234,
          "SubData2": "abcd"
        },
        "Piece2": {
          "SubData": {
            "SubSubData": 5678
          }
        },
        "Piece3": 3,
        "Piece4": "5"
      }
    };

    request.post('/UserSave')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        const expectedresponse = {
          "Success": true
        };

        expect(expectedresponse).toEqual(res.body);

        done();
      });
  });
});