const express = require('express');
var cors = require('cors');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'mydatabase'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(express.json());
app.use(cors());

// Set up a whitelist and check against it:
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    next();
    });

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE mydatabase';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createStudent', (req, res) => {
    let sql = 'CREATE TABLE student(username VARCHAR(20) not null, password VARCHAR(20) not null, fname VARCHAR(20) not null, lname VARCHAR(20) not null, address VARCHAR(20) not null, PRIMARY KEY(username))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Student table created...');
    });
});

app.get('/createTeacher', (req, res) => {
    let sql = 'CREATE TABLE teacher(username VARCHAR(20) not null, password VARCHAR(20) not null, fname VARCHAR(20) not null, lname VARCHAR(20) not null, address VARCHAR(20) not null, PRIMARY KEY(username))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Teacher table created...');
    });
});

// Insert post 1
app.post('/addStudent', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO student SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('Student added...');
    });
});

app.post('/addTeacher', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO teacher SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('Teacher added...');
    });
});

app.post('/auth', (req, res) => {
        let sql = '';
        if(req.body.type === '1'){ sql = `SELECT * FROM student WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;}
        else if(req.body.type === '2'){sql = `SELECT * FROM teacher WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;}
        else{
            let result = {auth:'false'};
            res.send(result);
            return;
        }
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            if(results.length > 0){
                results[0].auth ='true';
                if(req.body.type === '1'){ results[0].type = '1';}
                else if(req.body.type === '2'){results[0].type = '2';}
            }
            else{
                const result = {auth: 'false'};
                results.push(result);
            }
            
            res.send(results);
            return;
        });

});




app.get('/getStudent/:location', (req, res) => {
    let sql = `SELECT * FROM student WHERE address = '${req.params.location}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.get('/getTeacher/:location', (req, res) => {
    let sql = `SELECT * FROM teacher WHERE address = '${req.params.location}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get('/getTeacher/username/:username', (req, res) => {
    let sql = `SELECT * FROM teacher WHERE username = '${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get('/getStudent/username/:username', (req, res) => {
    let sql = `SELECT * FROM student WHERE username = '${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});