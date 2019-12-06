const server = require('../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);
const Error = require('../../src/models/error');
const mongoose = require('mongoose')

beforeEach(async (done) => {
  function clearCollections() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    const url = `mongodb://iugo:iugo@localhost:27017/admin?ssl=false`;
    await mongoose.connect(url, { useNewUrlParser: true });
  }

  return clearCollections();
});

describe('Transaction endpoint', () => {
  test('Try to save transaction with invalid Verifier', async (done) => {
    const transaction = {
      "TransactionId": 2,
      "UserId": 2,
      "CurrencyAmount": 2,
      "Verifier": "fd6b91387c2853ac8467bb4d90eac30897777fc6"
    };

    request.post('/Transaction')
      .send(transaction)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);

        const expectedError = new Error('The verifier code is invalid!');

        expect(expectedError).toEqual(res.body);

        done();
      });
  });

  test('Save a valid transaction', async (done) => {
    const transaction = {
      "TransactionId": 1,
      "UserId": 2,
      "CurrencyAmount": 3,
      "Verifier": "fd6b91387c2853ac8467bb4d90eac30897777fc6"
    };

    request.post('/Transaction')
      .send(transaction)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  test.skip('Try to Save a valid transaction duplicated', async (done) => {
    const transaction = {
      "TransactionId": 1,
      "UserId": 2,
      "CurrencyAmount": 3,
      "Verifier": "fd6b91387c2853ac8467bb4d90eac30897777fc6"
    };

    await request.post('/Transaction')
      .send(transaction);

    request.post('/Transaction')
      .send(transaction)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);

        done();
      });
  });
});