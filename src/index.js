require('dotenv').config();
const express = require('express');
const routes = require('./routes/api');
const { log } = require('./utils/logger');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

// Custom middleware to log requests
app.use((req, res, next) => {
    log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => log(`Server running on port ${PORT}`));