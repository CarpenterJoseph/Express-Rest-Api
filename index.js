const express = require('express')
const app = express()
const db = require('./db')


//middleware
app.use(express.json())

app.use(function (req, res, next) {
	console.log('Time', Date.now())
	next()
})

require('./routes/users-api')(app)

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/users'
db.connect(mongoURL)

app.listen(3000, () => {
	console.log(`Server listening on localhost:3000`)
})