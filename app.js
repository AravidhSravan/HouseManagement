const mysql = require("mysql");
const express = require("express");
var app = express();
var bodyparser = require("body-parser");
// const { json } = require("body-parser");
app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "mysql123",
    database: "housedb"
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection Established");
    }
    else {
        console.log("Connection not Established" + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3003, () => console.log("server up and running"));

app.get('/getAllHouse', (req, res) => {
    mysqlConnection.query('SELECT * FROM housetable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});

app.get('/getByType/:type', (req, res) => {
    mysqlConnection.query('SELECT * FROM housetable where type = ?', [req.params.type], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});

app.delete('/deleteHouse/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM housetable where houseId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Record Deleted');
            console.log("Record Deleted");
        }
        else {
            console.log("No data")
        }
    })
});


app.post('/savehouse', (req, res) => {
    var postData = req.body;
    mysqlConnection.query('INSERT INTO housetable SET ?', postData, (err, result, fields) => {
        if (!err) {
            res.send(JSON.stringify(result));
            console.log("Record saved");
        }
        else {
            console.log("No data")
        }
    })
});


app.get('/getById/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM housetable where houseId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});