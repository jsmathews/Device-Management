const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "test"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL");
});


// serve up production assets
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../', 'client', 'build')));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
});

app.get('/readAll', (req, res) => {
    const q = "SELECT * FROM deviceproperty"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/createDevice', (req, res) => {
    console.log('New Data: ', req.body);

    var q = "INSERT INTO deviceproperty (deviceName, deviceType, ownerName, batteryStatus) VALUES (?)";
    const values = [
        req.body.deviceName,
        req.body.deviceType,
        req.body.ownerName,
        req.body.batteryStatus
    ];

    db.query(q, [values], function (err, result) {
        if (err) return res.json(err);
        return res.json(result);
    });

});

app.post('/updateDevice', (req, res) => {
    var { id, deviceName, deviceType, ownerName, batteryStatus } = req.body;

    const q = `UPDATE deviceproperty SET deviceName = ?, deviceType = ?, ownerName = ?, batteryStatus=? WHERE id = ?`;

    const values = [deviceName, deviceType, ownerName, batteryStatus, id]

    db.query(q, values, function (err, result) {
        if (err) return res.json(err);
        return res.json(result);
    });

});

app.post('/deleteDevice', (req, res) => {
    // console.log(req.body)
    const { idToDelete } = req.body
    // res.end()
    var q = "DELETE FROM deviceproperty WHERE id = ?";
    const values = idToDelete

    db.query(q, [values], function (err, result) {
        if (err) return res.json(err);
        return res.json(result);
    });
});

const PORT = process.env.PORT || 5000;
console.log('server started on port:', PORT);
app.listen(PORT);