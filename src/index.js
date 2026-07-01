require('dotenv').config();

const express = require('express');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the demo Express application',
    endpoints: {
      health: 'GET /health',
      api: 'GET /api/*',
    },
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express server is running' });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});