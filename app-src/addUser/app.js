'use strict';
const sls = require('serverless-http');
const AWS = require('aws-sdk');

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const STUDENTS_TABLE = process.env.STUDENTS_TABLE;
const TUTORS_TABLE = process.env.TUTORS_TABLE;
const AUTH_TABLE = process.env.AUTH_TABLE;

const passwordHash = require('password-hash');

// One function for adding Student or Teacher, select table using type, API: /add 
app.post('/add', async (req, res) => {

  try{
    const {
      username, password, firstname,
      lastname, location, type,
    } = req.body;

    let tableName = type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE;

    const params = {
        TableName: tableName,
        Key: {
            username: username,
        },
    }
    
    dynamoDb.get(params, async (error, result) => {
      console.log(result)
        if (result.Item.username === username) {
            // if found
            return res.status(200).json({ "error": true, "message": `username already exists: ${username}` });

        }

      let data = await dynamoDb.transactWrite({
        TransactItems: [
        {
          Put: {
            TableName: tableName,
            // Is it possible to set userName primary key?
            // Key: { id: { S: username } },
            Item: {
              "username": username,
              "firstname": firstname,
              "lastname": lastname,
              "location": location,
              "type": type,
            },
          },
        },
        {
          Put: {
            TableName: AUTH_TABLE,
            // Key: { id: { S: username } },
            Item: {
              "username": username,
              "password": password, // passwordHash.generate(password),
              "type": type,
            }
          }
        },
        ]
      }).promise()

    });

  } catch (err){
    console.log(err)
      return res.status(400).json({"error": err})
  }
  

});

module.exports.addUser = sls(app)