const mongoose = require('mongoose')

const OtpSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		otp: { type: Number, required: true },

		otpPassToken:{type: String},
		otpPassExp:{type: Date}	,
		token: 
		{
			type: String}
	},
	{ collection: 'Otp_Schema' }
)

const otpmodel = mongoose.model('OTP_Schema', OtpSchema)

module.exports = otpmodel