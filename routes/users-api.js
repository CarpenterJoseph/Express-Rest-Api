const User = require('../models/user')
module.exports = function (app) {
	//get all users
	app.get('/api/users/', (req, res) => {
		User.find({}, (err, docs) => {
			if (!err) {
				res.send(docs)
			} else {
				res.send({error: err})
			}
		})
	})

	//get user
	/*
	app.get('/api/users/:userId', (req, res) => {
		let userId = req.params.userId
		User.findById(userId, (err, user) => {
			if (!err) {
				res.send(user)
			} else {
				res.send({error: err})
			}
		})
	})
	*/

	//get user async without try catch
	// app.get('/api/users/:userId', async (req, res) => {
	// 	const userId = req.params.userId
	// 	const user = await User.findById(userId)
	// 	res.send(user)
	// })

	//get user async with try catch
	app.get('/api/users/:userId', async (req, res) => {
		try {
			const userId = req.params.userId
			const user = await User.findById(userId)
			res.send(user)
		} catch (e) {
			console.log(e)
			res.sendStatus(500)
		}
	})

	//post user
	app.post('/api/users/', (req, res) => {
		let user = req.body
		User.create(user, (err, user) => {
			if (!err) {
				res.send(user)
			} else {
				res.send({error: err})
			}
		})
	})

	//update user
	app.put('/api/users/:userId', (req, res) => {
		let userId = req.params.userId
		let newUserEdit = req.body
		User.findById(userId, (err, user) => {
			if (!err) {
				user.age = newUserEdit.age || user.age
				user.name = newUserEdit.name || user.name
				user.email = newUserEdit.email || user.email
				user.save((er, savedUser) => {
					if (!er) {
						res.send(savedUser)
					} else {
						res.send(er)
					}
				})
			} else {
				res.send({error: err})
			}
		})
	})

	//delete user
	app.delete('/api/users/:userId', (req, res) => {
		let userId = req.params.userId
		User.findById(userId, (err, user) => {
			if (!err) {
				user.remove((er) => {
					if (!er) {
						res.send('USER DELETED')
					} else {
						res.send({error: er})
					}
				})
			} else {
				res.send({error: err})
			}
		})
	})
}