const mongoose = require('mongoose')

function connect(mongoURL) {
	//connect to mongoDB
	try {
		mongoose.connect(mongoURL).then(r => {
			console.log(`connected to mongodb at ${mongoURL}`)
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {connect}