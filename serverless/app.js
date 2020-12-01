'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const STUDENTS_TABLE = process.env.STUDENTS_TABLE;
const TUTORS_TABLE = process.env.TUTORS_TABLE;
const AUTH_TABLE = process.env.AUTH_TABLE;

module.exports.addUser = async (event, context, callback) => {
	let response = {
		statusCode: 200,
		headers: { "Access-Control-Allow-Origin": "*", },
		body: null
	}
	try {
		const {
			username, password, firstname,
			lastname, location, type,
		} = JSON.parse(event.body);
		console.log(JSON.parse(event.body));

		let tableName = type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE;

		const params = {
			TableName: tableName,
			Key: {
				username: username,
			},
		}
		console.log(params)

		await dynamoDb.get(params, (error, result) => {
			if (result && result.Item && result.Item.username === username) {
				console.log('username already exists')
				response.body = JSON.stringify({ "error": true, "message": `username already exists: ${username}` })
				callback(null, response);
			}
		}).promise();

		let data = await dynamoDb.transactWrite({
			TransactItems: [
				{
					Put: {
						TableName: tableName,
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
						Item: {
							"username": username,
							"password": password, // passwordHash.generate(password),
							"type": type,
						}
					}
				},
			]
		}).promise().then(
			function (data) {
				/* process the data */
				console.log('User Added');
				response.body = JSON.stringify({ "error": false, "message": `User added successfully: ${username}` })
				callback(null, response);
			},
			function (err) {
				/* handle the error */
				console.log('error occured while adding user');
				response.body = JSON.stringify({ "error": true, "message": err });
				response.statusCode = 400;
				callback(null, response);
			}
			);
	} catch (err) {
		response.body = JSON.stringify({ "error": true, "message": err });
		response.statusCode = 400;
		callback(null, response);
	}
}
module.exports.auth = (event, context, callback) => {
	let response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		body: null
	}
	try {
		const { username, password, type,
		  } = JSON.parse(event.body);
		console.log(`${username}, ${password}, ${type}`)
		if (!username || !password) {
			response.statusCode = 404;
			response.body = JSON.stringify({ "error": true, "message": `Username or password cannot be empty` })
			callback(null, response);
		}
		const params = {
			TableName: AUTH_TABLE,
			Key: {
				username: username,
			},
		}
		dynamoDb.get(params, (error, result) => {
			if (error) {
				response.statusCode = 404;
				response.body = JSON.stringify({ "error": true, "message": `Username not found` })
				callback(null, response);
			}
			console.log(result);
			if (Object.keys(result).length !== 0 && result.Item &&
				result.Item.password === password && result.Item.type === type) {
				let data = {};
				const params = {
					TableName: result.Item.type === 'student' ? STUDENTS_TABLE : TUTORS_TABLE,
					Key: {
						username: username,
					},
				}
				dynamoDb.get(params, (error, result) => {
					if (result) {
						data = result.Item;
						response.body = JSON.stringify({ auth: true, ...data });
						callback(null, response);
					}
				});
			} else {
				response.statusCode = 404;
				response.body = JSON.stringify({ "error": true, "message": `Username and password does not match 1st one` })
				callback(null, response);

			}
		});
	} catch (err) {
		response.statusCode = 404;
		response.body = JSON.stringify({ "error": true, "message": `Username and password does not match` })
		callback(null, response);
	}
};
module.exports.getStudentByLocation = (event, context, callback) => {
	try {
		const location = event.pathParameters.location;
		let response = {
			statusCode: 200,
			headers: { "Access-Control-Allow-Origin": "*" },
			body: null
		}
		const params = {
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
				response.statusCode = 404;
				response.body = JSON.stringify({ "error": true, "message": `No students found for ${location}` })
				callback(null, response);
			}
			console.log(result)
			response.statusCode = 200;
			response.body = JSON.stringify(result.Items)
			callback(null, response);
		});
	} catch (err) {
		console.log(err)
	}
};
module.exports.getTutorByLocation = (event, context, callback) => {
	try {
		const location = event.pathParameters.location;
		let response = {
			statusCode: 200,
			headers: { "Access-Control-Allow-Origin": "*" },
			body: null
		}
		const params = {
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
				response.statusCode = 404;
				response.body = JSON.stringify({ "error": true, "message": `No tutors found for ${location}` })
				callback(null, response);
			}
			console.log(result)
			response.statusCode = 200;
			response.body = JSON.stringify(result.Items)
			callback(null, response);
		});
	} catch (err) {
		console.log(err)
	}
};

module.exports.getTutorByUsername = (event, context, callback) => {
	const username = event.pathParameters.username;
	let response = {
		statusCode: 200,
		headers: { "Access-Control-Allow-Origin": "*" },
		body: null
	}
	const params = {
		TableName: TUTORS_TABLE,
		Key: {
			username: username,
		},
	}
	dynamoDb.get(params, (error, result) => {
		if (error) {
			console.log(error);
			response.statusCode = 404;
			response.body = JSON.stringify({ "error": true, "message": `No Tutors found with username: ${username}` })
			callback(null, response);
		}
		response.statusCode = 200;
		response.body = JSON.stringify(result)
		callback(null, response);
	});
};

module.exports.getStudentByUsername = (event, context, callback) => {
	const username = event.pathParameters.username;
	let response = {
		statusCode: 200,
		headers: { "Access-Control-Allow-Origin": "*" },
		body: null
	}
	const params = {
		TableName: STUDENTS_TABLE,
		Key: {
			username: username,
		},
	}
	dynamoDb.get(params, (error, result) => {
		if (error) {
			console.log(error);
			response.statusCode = 404;
			response.body = JSON.stringify({ "error": true, "message": `No Students found with username: ${username}` })
			callback(null, response);
		}
		response.statusCode = 200;
		response.body = JSON.stringify(result)
		callback(null, response);
	});
};