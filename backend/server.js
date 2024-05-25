const express = require('express');
const app = express();
require('./database/connection');
const todoRoutes = require('./routes/todo');

app.use('/todos', todoRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
