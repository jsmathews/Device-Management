const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    // res.send('hello from container')
});

const PORT = process.env.PORT || 3000;
console.log('server started on port:', PORT);
app.listen(PORT);