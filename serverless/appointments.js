'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const APPOINTMENTS_TABLE= process.env.APPOINTMENTS_TABLE;


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

// output
// {
//     "error": false
// }

module.exports.setAvailability = (event, context, callback) => {
	let response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		body: null
	}
	try{
		const {
			username, type, days
		} = JSON.parse(event.body);
		console.log(JSON.parse(event.body));

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
			TableName: APPOINTMENTS_TABLE,
			Item: {
				"username": username,
				"days": avail
			},

		};
		dynamoDb.put(params, (error, result) => {
			if (error)
			{
				console.log(error)
				response.statusCode = 404;
				response.body = JSON.stringify({  "error": true , "message" : `Could not update availability` })
				callback(null, response);
			}
			response.body = JSON.stringify({  "error": false  })
			callback(null, response);
		});
	}catch (err) {
		response.statusCode = 404;
		response.body = JSON.stringify({ "error": true, "message": `Could not update availability` })
		callback(null, response);
	}
};

// input
// {
// 	"username": "msarar",
// 	"type": "tutor"
// }
// output
//     {
//         "mon": [5,7,8],
//         "tue": [],
//         "wed": [4,5,9],
//         "thu": [1,2,6],
//         "fri": [1,5,6,8],
//         "sat": [5,6,7],
//         "sun": [1,2,3,4]
//     }

module.exports.getAvailability = (event, context, callback) => {
	let response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		body: null
	}
	try{
		const {
			username, type
		} = JSON.parse(event.body);
		console.log(JSON.parse(event.body));

		var params = {
			TableName: APPOINTMENTS_TABLE,
			Key: {
				"username": username,
			},
		};

		dynamoDb.get(params, (error, result) => {
			if (error) {
				console.log(error);
				response.statusCode = 404;
				response.body = JSON.stringify({  "error": true , "message" : `Could not find that tutor` })
				callback(null, response);
				// res.status(404).json({ "error": true , "error_msg" : "Could not find that tutor"});
			}
			console.log(result);

			let data = result.Item;
			let days = data.days;
			let ret = {};
			for(let day in days){
				ret[day] = days[day]["available"];
			}

			console.log(ret);

			response.body = JSON.stringify({  "error": false, "data": ret, "tutorid" : username })
			callback(null, response);
			// res.status(200).json({ "error": false, "data": ret });
		});
	}catch (err) {
		response.statusCode = 404;
		response.body = JSON.stringify({ "error": true, "message": `Could not get tutor availability` })
		callback(null, response);
	}
};


// input
// {
// 	"tutorid": "msarar",
// 	"studentid": "yolo",
//     "day": "mon",
//     "hours": [6,7]
// }

module.exports.bookAvailability = async (event, context, callback) => {
	let response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		body: null
	}
	try{
		const {
			tutorid, studentid, day, hours
		} = JSON.parse(event.body);
		console.log(JSON.parse(event.body));

		var params = {
			TableName: APPOINTMENTS_TABLE,
			Key: {
				"username": tutorid,
			},
		};
		let days;
		console.log(params)
		await dynamoDb.get (params, async (error, result) => {
			console.log(result);
			if (result && result.Item){
				console.log(result);

				let data = result.Item;
				console.log(data.days);
				days = data.days;
				let day_data = days[day];

				for (var i = 0; i< hours.length; i++)
				{
					console.log(hours[i])
					let index = day_data["available"].indexOf(hours[i]);
					if (index > -1) {
						day_data["available"].splice(index, 1);
					}
					else{
						response.statusCode = 404;
						response.body = JSON.stringify({ "error": true, "message": `Tutor not available at that time` })
						callback(null, response);
						// res.status(404).json({ "error": true , "error_msg" : "Tutor not available at that time"});
					}
					day_data["booked"][hours[i]]= studentid
				}
				console.log(day_data)
				days[day] = day_data
				console.log("monday changed", data)
			}

			else if (error) {
				console.log(error);
				response.statusCode = 404;
				response.body = JSON.stringify({ "error": true, "message": `Unable to find tutor` })
				callback(null, response);
				// res.status(404).json({ "error": true, "message": `Unable to find tutor`});
			}
		}).promise()

		var params = {
			TableName: APPOINTMENTS_TABLE,
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
						response.statusCode = 404;
						response.body = JSON.stringify({ "error": true, "message": `Unable to update database` })
						callback(null, response);
						// res.status(404).json({ "error": true , "error_msg" : "Unable to update database"});
					}
					console.log(result);
					response.body = JSON.stringify({  "error": false })
					callback(null, response);
					// res.status(200).json({"error": false});
				}).promise()
	}catch (err) {
		console.log(err)
		response.statusCode = 404;
		response.body = JSON.stringify({ "error": true, "message": `Could not book availability` })
		callback(null, response);
	}
};
	