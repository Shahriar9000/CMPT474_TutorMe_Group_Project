'use strict';
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
var cors = require('cors')
const passwordHash = require('password-hash');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const STUDENTS_TABLE = process.env.STUDENTS_TABLE;
const TUTORS_TABLE = process.env.TUTORS_TABLE;
const AUTH_TABLE = process.env.AUTH_TABLE;



app.get('/', async (req, res, next) => { 
    res.status(200).json('Hello Serverless!')
   });

// One function for adding Student or Teacher, select table using type, API: /add 
/*
app.post('/add', async (req, res) => {
    const {
      username, password, first_name,
      last_name, location, type,
    } = req.body;

    tableName = type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE

    data = await dynamoDb.transactWriteItems({
      TransactItems: [
        {
            putItem: {
                TableName: tableName,
                // Is it possible to set userName primary key?
                // Key: { id: { S: username } },
                Item: {
                  "username": username,
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
*/

app.post('/auth', async (req, res, next) => {
    const { username, pass, type } = req.body;
    console.log(`${username}, ${pass}, ${type}`)
    const params = {
        TableName: type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE,
        Key: {
            username: username,
        },
    }
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

app.get('/getStudent/:location', (req, res) => {
    try {
        const location = req.params.location;

        var params = {
            TableName: STUDENTS_TABLE,
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

app.get('/getTutor/:location', (req, res) => {
    try {
        const location = req.params.location;

        var params = {
            TableName: TUTORS_TABLE,
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
                res.status(404).json({ error: `No Tutor found for ${location}` });
            }
            console.log(result);
            res.status(200).json(result.Items);
        });
    } catch (err) {
        console.log(err)
    }
});

app.get('/getTutor/username/:username', (req, res) => {
    const username = req.params.username;
    
        const params = {
            TableName: TUTORS_TABLE,
            Key: {
                username: username,
            },
        }
        dynamoDb.get(params, (error, result) => {
            if (error) {
                console.log(error);
                res.json({ error: `No Tutors found with username: ${username}` });
            }
            res.json(result);
        });
    });

app.get('/getStudent/username/:username', (req, res) => {
    const username = req.params.username;

    const params = {
        TableName: STUDENTS_TABLE,
        Key: {
            username: username,
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