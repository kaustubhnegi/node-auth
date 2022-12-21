const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: false, index: true, unique: true, sparse: true, },
		password: { type: String, required: false },

		phone: {
			type: String,
			required: false
		},
		otp: {
			type: Number
		},
		image: {
			type: String,
		  },

		resetPassToken: { type: String },
		resetPassExp: { type: Date },
		verfication: { type: Boolean },
		token:
		{
			type: String
		},
		otpPassToken: { type: String },
		otpPassExp: { type: Date },
		token:
		{
			type: String
		}

	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
