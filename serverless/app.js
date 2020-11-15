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
app.post('/add', async (req, res) => {

	const {
	  username, password, firstname,
	  lastname, location, type,
	} = req.body;

	let tableName = type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE;

	// const params = {
	//     TableName: STUDENTS_TABLE,
	//     Key: {
	//         username: username,
	//     },
	// }
	
	// dynamoDb.get(params, (error, result) => {
	//     if (result) {
	//         // if found
	//         res.json({ "error": true, "message": `username already exists: ${username}` });

	//     }
	// });
	// return;

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
	}).promise().then(
		function(data) {
			/* process the data */
			return res.status(200).json({ "error": false, "message": "User added successfully"})
		},
		function(error) {
		  	/* handle the error */
		  	return res.status(500).json({ "error": true, "message": err.message})
		}
	);

});


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
			res.status(200).json({ auth: true, type: result.Item.type, "username": username  });
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