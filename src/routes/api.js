const express = require('express');

const router = express.Router();

const quotes = [
  { id: 1, text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { id: 2, text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { id: 3, text: 'Programs must be written for people to read.', author: 'Harold Abelson' },
];

const users = [
  { id: 1, name: 'Alice', role: 'developer' },
  { id: 2, name: 'Bob', role: 'designer' },
  { id: 3, name: 'Carol', role: 'manager' },
];

router.get('/ping', (req, res) => {
  res.type('text/plain').send('pong');
});

router.get('/status', (req, res) => {
  res.type('text/plain').send('All systems operational');
});

router.get('/info', (req, res) => {
  res.json({
    name: 'demo-node-app',
    description: 'A simple Express application',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

router.get('/time', (req, res) => {
  res.json({
    iso: new Date().toISOString(),
    unix: Math.floor(Date.now() / 1000),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
});

router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    node: process.version,
    platform: process.platform,
  });
});

router.get('/quote', (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(quote);
});

router.get('/quotes', (req, res) => {
  res.json({ count: quotes.length, data: quotes });
});

router.get('/users', (req, res) => {
  res.json({ count: users.length, data: users });
});

router.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/echo', (req, res) => {
  res.json({
    message: 'Request body received',
    body: req.body,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;