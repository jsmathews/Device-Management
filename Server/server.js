const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const waitOn = require('wait-on');
require('dotenv').config()

var db;
var mySqlHost = process.env.STATUS == 'docker' ? (process.env.DOCKER_MYSQL_HOST) : (process.env.DEV_MYSQL_HOST);

const mysqlOptions = {
    resources: [`tcp:${mySqlHost}:3306`], // Replace with the appropriate host and port of your MySQL service
    timeout: 60000, // Maximum time to wait in milliseconds (adjust as needed)
};

// Wait for MySQL service to be ready
waitOn(mysqlOptions)
    .then(() => {
        console.log('MySQL service is ready');
        connectToMySQL();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, (error) => {
            if (error) {
                console.error('An error occurred while starting the server:', error);
            } else {
                console.log('server listening on port:', PORT);
            }
        });

    })
    .catch((error) => {
        console.error('Error waiting for MySQL service:', error);
    });

function connectToMySQL() {
    db = mysql.createConnection({
        host: mySqlHost,
        port: 3306,
        user: "root",
        password: "admin123",
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL server');

        // Check if the database exists
        db.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', ['mydb'], (err, rows) => {
            if (err) {
                console.error('Error checking database existence:', err);
                // db.end(); // Close the MySQL db
                return;
            }

            if (rows.length === 0) {
                // Database does not exist, create it
                db.query('CREATE DATABASE mydb', (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        // db.end(); // Close the MySQL db
                        return;
                    }
                    console.log('Database created successfully');
                    // createTable();
                    checkOrCreateTable();
                });
            }
            else {
                // Database already exists, create the table
                // createTable();
                checkOrCreateTable()
            }
        });

        function checkOrCreateTable() {
            // Use the "mydb" database
            db.query('USE mydb', (err) => {
                if (err) {
                    console.error('Error using database:', err);
                    // db.end();
                    return;
                }

                // Check if the "deviceproperty" table exists
                db.query('SHOW TABLES LIKE "deviceproperty"', (err, results) => {
                    if (err) {
                        console.error('Error checking table:', err);
                        // db.end();
                        return;
                    }

                    if (results.length > 0) {
                        console.log('Table "deviceproperty" exists');
                        // db.end();
                    }
                    else {
                        // Create the "deviceproperty" table
                        const createTableQuery = `
                  CREATE TABLE deviceproperty (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    deviceName VARCHAR(255),
                    deviceType VARCHAR(255),
                    ownerName VARCHAR(255),
                    batteryStatus VARCHAR(255)
                  )
                `;

                        db.query(createTableQuery, (err) => {
                            if (err) {
                                console.error('Error creating table:', err);
                                // db.end();
                                return;
                            }

                            console.log('Table "deviceproperty" created');
                            // db.end();
                        });
                    }
                });

            });
        }

        // Function to create the deviceproperty table
        function createTable() {
            // SQL statement to create the deviceproperty table
            const createTableSQL = `
            CREATE TABLE IF NOT EXISTS mydb.deviceproperty (
              id INT AUTO_INCREMENT PRIMARY KEY,
              deviceName VARCHAR(255) NOT NULL,
              deviceType VARCHAR(255) NOT NULL,
              ownerName VARCHAR(255) NOT NULL,
              batteryStatus INT NOT NULL
            )
          `;

            // Execute the SQL statement to create the table
            db.query(createTableSQL, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    db.end(); // Close the MySQL db
                    return;
                }
                console.log('deviceproperty table created successfully');
                db.end(); // Close the MySQL db
            });
        }
    });
}

// serve up production assets
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ping from server')
});

app.get('/readAll', (req, res) => {
    const q = "SELECT * FROM mydb.deviceproperty"
    db.query(q, (err, data) => {
        if (err) {
            console.log(err)
            res.json(err);
        }
        return res.json(data)
    })
})

app.post('/createDevice', (req, res) => {
    console.log('New Data: ', req.body);

    var q = "INSERT INTO mydb.deviceproperty (deviceName, deviceType, ownerName, batteryStatus) VALUES (?)";
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

    const q = `UPDATE mydb.deviceproperty SET deviceName = ?, deviceType = ?, ownerName = ?, batteryStatus=? WHERE id = ?`;

    const values = [deviceName, deviceType, ownerName, batteryStatus, id]

    db.query(q, values, function (err, result) {
        if (err) return res.json(err);
        return res.json(result);
    });

});

app.post('/deleteDevice', (req, res) => {
    const { idToDelete } = req.body
    var q = `DELETE FROM mydb.deviceproperty WHERE id IN (${idToDelete.join()})`
    // const values = idToDelete
    console.log(idToDelete)

    db.query(q, function (err, result) {
        if (err) return res.json(err);
        return res.json(result);
    });
});

