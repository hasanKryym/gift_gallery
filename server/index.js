const express = require('express');
const app = express();

// routers
const authentication = require('./routes/authentication');
const products = require('./routes/products');
const users = require('./routes/users');

// Middleware
const authorize = require('./middleware/authorization');

const cors = require('cors');
const checkAdmin = require('./middleware/checkAdmin');

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1/auth', authentication);
app.use('/api/v1/products', products);
app.use('/api/v1/users', authorize, users);

app.listen(5000, () => {
  console.log('server running on port 5000...');
});
