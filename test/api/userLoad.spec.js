const server = require('../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose')

beforeAll(async () => {
  const url = `mongodb://iugo:iugo@localhost:27017/admin?ssl=false`;
  await mongoose.connect(url, { useNewUrlParser: true });
})

describe('UserLoad endpoint', () => {
  test('Load user data', async (done) => {
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

    await request.post('/UserSave')
      .send(userData);


    const expectedresponse = {
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
    };

    const data = {
      "UserId": 1
    };
    
    request.post('/UserLoad')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(expectedresponse).toEqual(res.body);

        done();
      });
  });

  test('Load an invalid user data', async (done) => {
    const expectedresponse = {};

    const data = { "UserId": 1111 };
    
    request.post('/UserLoad')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(expectedresponse).toEqual(res.body);

        done();
      });
  });
});