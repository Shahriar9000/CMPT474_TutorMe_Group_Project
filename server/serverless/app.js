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
const passwordHash = require('password-hash');
const AUTH_TABLE = process.env.AUTH_TABLE;

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

// One function for adding Student or Teacher, select table using type, API: /add 
//app.use(bodyParser.json({ strict: false }));
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => { 
    res.status(200).json('Hello Serverless!')
   });

// zubayr
app.post('/add', (req, res) => {
    // let post = req.body;
    // let sql = 'INSERT INTO student SET ?';
    // let query = db.query(sql, post, (err, result) => {
    //     if(err) throw err;
    //     res.send('Student added...');
    // });

    const {
      username,
      password
      first_name,
      last_name,
      location,
      type,
    } = req.body;

    tableName = type === 'student' ? STUDENT_TABLE : TEACHER_TABLE

    data = await dynamoDb.transactWriteItems({
      TransactItems: [
        {
            putItem: {
                TableName: tableName
                // Is it possible to set userName primary key?
                // Key: { id: { S: username } },
                Item: {
                  "userName": username,
                  "firstName": first_name,
                  "lastName": last_name,
                  "location": location,
                  "type": type,
                },
            },
        },
        {
            putItem: {
                TableName: AUTH_TABLE,
                // Key: { id: { S: username } },
                Item: {
                  "userName": username,
                  "password": passwordHash.generate(password),
                  "type": type,
                }
            }
        },
      ]
    }).promise().catch(error => alert(error.message));

});

// arslan
app.post('/auth', async (req, res, next) => {
    const { username, pass, type } = req.body;
    console.log(`${username}, ${pass}, ${type}`)
    const params = {
        TableName: type === 'student' ? STUDENT_TABLE : TEACHER_TABLE,
        Key: {
            username: username,
        },
    }
    console.log(`params: ${params}`)
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: `Username not found` });
        }
        console.log(result);
        if (result && result.Item.pass === pass) {
            res.status(200).json({ auth: true, type: result.Item.type });
        } else {
            res.status(404).json({ error: `Username and password does not match` });

        }
    });
});

// arslan
app.get('/getStudent/:location', (req, res) => {
    try {
        const location = req.params.location;

        var params = {
            TableName: STUDENT_TABLE,
            FilterExpression: '#loc = :loc',
            ExpressionAttributeNames: {
                '#loc': 'location',
            },
            ExpressionAttributeValues: {
                ':loc': location,
            },
        };
        dynamoDb.scan(params, (error, result) => {
            if (error) {
                console.log(error);
                res.status(404).json({ error: `No students found for ${location}` });
            }
            console.log(result);
            res.status(200).json(result.Items);
        });
    } catch (err) {
        console.log(err)
    }
});

// raad
app.get('/getTeacher/:location', (req, res) => {
    try {
        const location = req.params.location;

        var params = {
            TableName: TEACHER_TABLE,
            FilterExpression: '#loc = :loc',
            ExpressionAttributeNames: {
                '#loc': 'location',
            },
            ExpressionAttributeValues: {
                ':loc': location,
            },
        };
        dynamoDb.scan(params, (error, result) => {
            if (error) {
                console.log(error);
                res.status(404).json({ error: `No Teacher found for ${location}` });
            }
            console.log(result);
            res.status(200).json(result.Items);
        });
    } catch (err) {
        console.log(err)
    }
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
        TableName: STUDENT_TABLE,
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