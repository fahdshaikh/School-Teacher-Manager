const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const Teacher = require('./Models/Teacher');
// const teachersJSON = require('./teachers.json');
const Routes = require('./Routes/Teachers');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/teacher', Routes);

mongoose.connect(
    process.env.ATLAS_URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            console.log('The Database is Not Connected');
        } else {
            console.log('The Database is Connected');
        }
    },
);

app.listen(5000, () => {
    console.log('The server is up and running');
});
