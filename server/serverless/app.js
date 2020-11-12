'use strict';
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
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
        let sql = '';
        if(req.body.type === '1'){ sql = `SELECT * FROM student WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;}
        else if(req.body.type === '2'){sql = `SELECT * FROM teacher WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;}
        else{
            let result = {auth:'false'};
            res.send(result);
            return;
        }
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            if(results.length > 0){
                results[0].auth ='true';
                if(req.body.type === '1'){ results[0].type = '1';}
                else if(req.body.type === '2'){results[0].type = '2';}
            }
            else{
                const result = {auth: 'false'};
                results.push(result);
            }
            
            res.send(results);
            return;
        });

});



// arslan
app.get('/getStudent/:location', (req, res) => {
    let sql = `SELECT * FROM student WHERE address = '${req.params.location}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
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
    let sql = `SELECT * FROM student WHERE username = '${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
      age: 19,
    },
  };
dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not create user ${userId}` });
    }
    res.json({ userId, name });
  });
})
// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not get user ${userId}` });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: `User ${userId} not found` });
    }
  });
})
module.exports.server = sls(app)
