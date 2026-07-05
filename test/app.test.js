const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

describe('Express API', () => {
  it('GET /health returns ok', async () => {
    const response = await request(app).get('/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
    assert.equal(response.body.message, 'Express server is running');
  });

  it('GET /api/ping returns pong', async () => {
    const response = await request(app).get('/api/ping');

    assert.equal(response.status, 200);
    assert.equal(response.text, 'pong');
  });

  it('GET /api/users returns user list', async () => {
    const response = await request(app).get('/api/users');

    assert.equal(response.status, 200);
    assert.equal(response.body.count, 3);
    assert.equal(Array.isArray(response.body.data), true);
  });
});