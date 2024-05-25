const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});
