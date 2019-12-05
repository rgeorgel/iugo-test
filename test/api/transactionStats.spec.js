const server = require('../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);
const Error = require('../../src/models/error');
const mongoose = require('mongoose')

beforeAll(async () => {
  const url = `mongodb://iugo:iugo@localhost:27017/admin?ssl=false`;
  await mongoose.connect(url, { useNewUrlParser: true });
})

describe('transactionStats endpoint', () => {
  beforeAll(async (done) => {
    const transaction = {
      "TransactionId": 5,
      "UserId": 5,
      "CurrencyAmount": 6,
      "Verifier": "82cc28da5637a2880792618561b194522e2b0ce9"
    };

    request.post('/Transaction')
      .send(transaction);

    done();
  });

  test('get all user transactions', async (done) => {
    const data = {
      "UserId": 5
    };

    request.post('/TransactionStats')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        const expectedresponse = {
          "UserId": 5,
          "TransactionCount": 1,
          "CurrencySum": 6
        }

        expect(expectedresponse).toEqual(res.body);

        done();
      });
  });
});