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
const APPOINTMENT_TABLE= process.env.APPOINTMENT_TABLE;


app.get('/', async (req, res, next) => {
	res.status(200).json('Hello Serverless!')

});

// input
// {
//     "username": "msarar",
//     "type": "tutor",
//     "days": {
//         "mon": [5,6,7,8],
//         "tue": [],
//         "wed": [4,5,9],
//         "thu": [1,2,6],
//         "fri": [1,5,6,8],
//         "sat": [5,6,7],
//         "sun": [1,2,3,4]
//     }
// }
app.post('/appointment/setAvailability', (req, res) => {
	try {
		// const location = req.params.location;
		// mon, tue, wed, thu, fri, sat, sun
		const { username, type, days } = req.body;
		console.log(username, type, days);

		//might need to check if availability already exists
		let avail = {};
		for(let day in days){
			avail[day] = {
				"available": days[day],
				"booked": {}
			}
		}

		console.log(avail);

		var params = {
			TableName: APPOINTMENT_TABLE,
			Item: {
				"username": username,
				"days": avail
			},

		};
		dynamoDb.put(params, (error, result) => {
			if (error)
			{
				res.status(404).json({ "error": true , "error_msg" : "Could not update availability"});
			}
			console.log(result);
			res.status(200).json({ "error": false });
		});
	} catch (err) {
		console.log(err)
		res.status(404).json({ error: err });
	}
});

// input
// {
// 	"username": "msarar",
// 	"type": "tutor"
// }
// output
//     {
//         "mon": [5,6,7,8],
//         "tue": [],
//         "wed": [4,5,9],
//         "thu": [1,2,6],
//         "fri": [1,5,6,8],
//         "sat": [5,6,7],
//         "sun": [1,2,3,4]
//     }
app.post('/appointment/getAvailability', (req, res) => {
	try {
		// const location = req.params.location;
		// mon, tue, wed, thu, fri, sat, sun
		const { username, type } = req.body;
		console.log(username, type);

		var params = {
			TableName: APPOINTMENT_TABLE,
			Key: {
				"username": username,
			},
		};

		dynamoDb.get(params, (error, result) => {
			if (error) {
				console.log(error);
				res.status(404).json({ "error": true , "error_msg" : "Could not find that tutor"});
			}
			console.log(result);

			let data = result.Item;
			console.log(data.days);
			let days = data.days;


			let ret = {};
			for(let day in days){
				ret[day] = days[day]["available"];
			}
			console.log(ret);

			// let ret = {};
			// for(let day in days){
			// 	num_days = days[day]["available"].length
			// 	for (let i=0; i< num_days; i++)
			// 	{
			// 		ret[day]
			// 	}
			// }


			res.status(200).json({ "error": false, "data": ret });
		});
	} catch (err) {
		console.log(err)
		res.status(404).json({ error: err });
	}
});

// input
// {
// 	"tutorid": "msarar",
// 	"studentid": "yolo",
//     "day": "mon",
//     "hours": [6,7]
// }
app.post('/appointment/bookAvailability', async(req, res) => {
	try {
		// const location = req.params.location;
		// mon, tue, wed, thu, fri, sat, sun
		const { tutorid, studentid, day, hours } = req.body;
		console.log(tutorid, studentid, day, hours);

		var params = {
			TableName: APPOINTMENT_TABLE,
			Key: {
				"username": tutorid,
			},
		};
		var days;
		dynamoDb.get (params, async (error, result) => {
			console.log(result);
			if (result && result.Item){
				console.log(result);

				let data = result.Item;
				console.log(data.days);
				let days = data.days;
				let day_data = days[day];
				// day_data["available"].remove(hours)
				for (var i = 0; i< hours.length; i++)
				{
					console.log(hours[i])
					let index = day_data["available"].indexOf(hours[i]);
					if (index > -1) {
						day_data["available"].splice(index, 1);
					}
					else{
						res.status(404).json({ "error": true , "error_msg" : "Tutor not available at that time"});
					}
					day_data["booked"][hours[i]]= studentid
				}
				console.log(day_data)
				days[day] = day_data
				console.log("monday changed", data)

				var params = {
					TableName: APPOINTMENT_TABLE,
					Key: {
						"username": tutorid,
					},
					UpdateExpression: "set days = :r",
					ExpressionAttributeValues:{
						":r": days,
					},
					ReturnValues:"UPDATED_NEW"


				};
				await dynamoDb.update(params, (error, result) => {
					if (error) {
						console.log(error);
						res.status(404).json({ "error": true , "error_msg" : "Unable to update database"});
					}
					console.log(result);
				res.status(200).json({"error": false});
				})
			}

			else if (error) {
				console.log(error);
				res.status(404).json({ "error": true});
			}

		});

	} catch (err) {
		console.log(err)
		res.status(404).json({ error: err });
	}
});


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
		    if (result && result.Item && result.Item.username === username) {
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

	} catch (err){
		console.log(err)
	  	return res.status(400).json({"error": err})
	}


});


app.post('/auth', async (req, res, next) => {
	try{
		const { username, password, type } = req.body;
		console.log(`${username}, ${password}, ${type}`)
		if(!username || !password) {
			res.status(404).json({ error: `Username or password cannot be empty`});
		}
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
			if (Object.keys(result).length !== 0 && result.Item &&
				result.Item.password === password && result.Item.type === type) {
				let response = {};
				const params = {
					TableName: result.Item.type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE,
					Key: {
						username: username,
					},
				}
				dynamoDb.get(params, (error, result) => {
					if (result) {
						response = result.Item;
						res.status(200).json({ auth: true, ...response });
					}
				})
			} else {
				res.status(404).json({ error: `Username and password does not match` });

			}
		});
	} catch(err) {
		res.status(404).json({ error: `Username and password does not match` });
	}
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
