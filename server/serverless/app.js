'use strict';
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const STUDENT_TABLE = process.env.STUDENT_TABLE;
const TEACHER_TABLE = process.env.TEACHER_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.json({ strict: false }));

module.exports.server = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


// zubayr
app.post('/addStudent', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO student SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('Student added...');
    });
});

//zubayr
app.post('/addTeacher', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO teacher SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('Teacher added...');
    });
});

// arslan
app.post('/auth', (req, res) => {
    const { username, pass, type } = req.body;
    const params = {
        TableName: type === 'student' ? STUDENT_TABLE : TEACHER_TABLE,
        Key: {
            userName: username,
        },
    }
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: `Username not found` });
        }
        if (result.Item.pass === pass) {
            res.json({ auth: true, type: result.Item.type });
        } else {
            res.status(404).json({ error: `Username and password does not match` });

        }
    });
});



// arslan
app.get('/getStudent/:location', (req, res) => {
    const location = req.params.location;

    var params = {
        TableName: STUDENT_TABLE,
        KeyConditionExpression: "#location = :location",
        ExpressionAttributeNames: {
            "#location": "location"
        },
        ExpressionAttributeValues: {
            ":location": location
        }
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.json({ error: `No students found for ${location}` });
        }
        res.json(result);
    });
});

// raad
app.get('/getTeacher/:location', (req, res) => {
    let sql = `SELECT * FROM teacher WHERE address = '${req.params.location}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
// raad
app.get('/getTeacher/username/:username', (req, res) => {
    let sql = `SELECT * FROM teacher WHERE username = '${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
// arslan
app.get('/getStudent/username/:username', (req, res) => {
    const username = req.params.username;

    const params = {
        TableName: type === 'student' ? STUDENT_TABLE : TEACHER_TABLE,
        Key: {
            userName: username,
        },
    }
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.json({ error: `No students found with username: ${username}` });
        }
        res.json(result);
    });
});

module.exports.server = sls(app)