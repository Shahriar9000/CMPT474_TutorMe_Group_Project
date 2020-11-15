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

app.post('/auth', async (req, res, next) => {
    const { username, password, type } = req.body;
    console.log(`${username}, ${password}, ${type}`)
    const params = {
        TableName: AUTH_TABLE,
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
        if (result && result.Item.password === password) {
            res.status(200).json({ auth: true, type: result.Item.type });
        } else {
            res.status(404).json({ error: `Username and password does not match` });

        }
    });
});

module.exports.authenticateUser = sls(app)