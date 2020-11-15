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

module.exports.getTutor = sls(app)