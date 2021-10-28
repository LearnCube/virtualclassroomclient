require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;
const jwt = require('jsonwebtoken');
const files = require('./lib-files.json');
app.use(express.json());


router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/get-valid-token/', function (req, res) {

	// If user is valid and logged in, return the jwt with your learncube user details

	const privateKey = process.env.privateKey || 'set private key in the .env file'
	const user_name = process.env.user_name || 'set user_name in .env file'
	const user_id = process.env.user_id || 'set user_id in .env file'
	const email = process.env.email || 'set email in .env file'

	const token = jwt.sign({
		"exp": Math.floor(Date.now() / 1000) + (60 * 5),
		"username": user_name,
		"user_id": user_id,
		"email": email,
	}, privateKey, { algorithm: 'HS256' })

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ 'token': token }))
});

router.get('/content-library/', function (req, res) {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.end(JSON.stringify(files))
})

app.use('/', router);
app.listen(process.env.port || 3000)