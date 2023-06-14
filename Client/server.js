const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.REACT_APP_PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.error('An error occurred while starting the server:', error);
    } else {
        console.log('Client listening on port:', PORT);
    }
});