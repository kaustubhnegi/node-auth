
const User = require('../model/user')
const OTPdb = require('../model/otp')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const otpGenerator = require('totp-generator')
const lodash = require('lodash')
const bcrypt = require('bcryptjs')
const base32 = require('base32')


//otp modules
// const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
// const messagebird = require('message');
// const otpGenerator = require('otp-generator');


const emailRegxp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	const mobRegxp1 = /^(\+\d{1,3}[- ]?)?\d{10}$/
	const mobRegxp2 = /0{5,}/
// const app = express()
// app.use('/', express.static(path.join(__dirname, 'static')))
// app.use(bodyParser.json())

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

exports.register = async (req, res, next) => {
	const { username, password: plainTextPassword } = req.body
	console.log(req.body.password)

	// if (!username || typeof username !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid username' })
	// }
	// if (!emailRegxp.test(req.body.username)) {
	// 	// errors.push("invalid email");
	// 	console.log("Invalid email")
	// 	return res.json({
	// 		status: 'error',
	// 		error: 'Invalid Email'
	// 	})
	// }
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	//   const token = jwt.sign(
	// 	{ userId: users._id, users },
	// 	process.env.TOKEN,
	// 	{
	// 	  expiresIn: "1d",
	// 	}
	//   );
	//   users.token = token;

	try {

		const response = await User.create({
			username,
			password,

		})
		return res.status(200).json({ response })
		// console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key	
			// console.log(JSON.stringify(error));
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })

}

exports.login = async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)
		console.log(username + " Logged in successfully")
		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
}







exports.logout = async (req, res) => {
	const payload = {};
	jwt.sign(payload, "", { expiresIn: 1 }, (logout, err) => {
		if (logout) {
			console.log(logout);
			res.send({ msg: "You have been Logged Out" + payload });
		} else {
			res.send({ msg: "Error" });
		}
	});

}

exports.forgetPass = async (req, res) => {

	let { username } = req.body;

	let errors = [];

	let flag = 0;
	if (!username) {
		errors.push("Please Enter the email");
		flag = 1;
	}

	if (!emailRegxp.test(username)) {
		flag = 1;
		errors.push("Please Enter correct email");

	}

	if (flag == 1) {
		return res.status(422).json({
			errors: errors
		})
	}

	User.findOne({ username: username }).then((user) => {

		if (!user)
			res.status(500).send({ message: "No user registered with this email" });

		else {
			user.resetPassToken = crypto.randomBytes(20).toString("hex");;
			user.resetPassExp = Date.now() + 3000000;

			user.save();

		}

		// const link = `${process.env.DATABASE}/resetPassword/${user._id}/${user.resetPasswordToken}`;
		const link1 =
			"http://" + req.headers.host +
			`/reset_password/${user._id}/${user.resetPassToken}`;
		console.log(link1);	

		res.send(link1);
	})

};


exports.resPassword = (req, res, next) => {

	// let{password} = req.body;
	User.findById(req.params.userId).then((user) => {
		if (!user) {
			res.status(400).send("Invalid Link OR Link Expired");
		} else {

			User.findById(req.params.userId)
				.then((user) => {
					//   console.log(user)
					if (user.resetPassExp > Date.now()) {
						console.log("hh")
						user.password = req.body.password;



						bcrypt.genSalt(10, function (err, salt) {
							bcrypt.hash(user.password, salt, function (err, hash) {
								if (err) throw err;
								user.password = hash;
								user.save();
								console.log(user.password);
								res.status(201).send(user);
							});

						});
					}
					else {
						res.status(401).send("Reset Password Token Expired")
					}
				})
				.catch((err) => {
					res.status(502).json({ errors: err });
					console.log(err);
				})
		}
	});
};





exports.otpverify = (req, res) => {
	User.findOne({
		username: req.body.username,
		otp: req.body.otp
	}).then((user) => {
		if (!user) {
			res.status(400).send("Invalid or Expired OTP");
		} else {
			console.log(user)
			if (req.body.otp === user.otp) {
				if (user.otpPassExp > Date.now()) {
					console.log("hh")
					user.verfication = true;
					user.save()
					res.send("verfied")
				}
				else {
					res.status(401).send("OTP  Token Expired")
				}
			}
			else {
				res.status(400).send("incorrect OTP")
			}
		}
	})
		.catch((err) => {
			res.status(502).json({ errors: err });
			console.log(err);
		})
}
















exports.otpsignup = async (req, res, next) => {
	const { username } = req.body
	console.log(req.body.username)


	if (!emailRegxp.test(req.body.username)) {
		// errors.push("invalid email");
		console.log("Invalid email")
		return res.json({
			status: 'error',
			error: 'Invalid Email'
		})
	}

	User.findOne({ username: username })
		.then((user) => {
			if (user) {
				const link1 =
					"http://" + req.headers.host +
					"/login"
				return res
					.status(422)
					.json({ errors: [{ user: "email already exists signin instead " }], msg: link1 });
			} else {
				// const tok = "JBSWY3DPEHOK3PYP"+ req.body.username
				
				

				const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

				function generateString(length) {
					let result = "";
					const charactersLength = characters.length;
					for ( let i = 0; i < length; i++ ) {
						result += characters.charAt(Math.floor(Math.random() * charactersLength));
					}
					console.log(result)
					// var str = base32.stringify(result) // base32.encode then convert to string
					// var origBuf = base32.parse(str) 	
					
					return (result);
				}
				
				const ans = generateString(16)
				// const tok = "AJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJ"

				const OTP = otpGenerator(ans, {
					digits: 8,
					algorithm: "SHA-512",
					period: 60,
					timestamp: 1465324707000
				})
				const otpPassToken = crypto.randomBytes(20).toString("hex");;
				const otpPassExp = Date.now() + 3000000;
				// 	let password
				//   bcrypt.hash(req.body.password, 10).then(password=>{return password})



				//	router.post('/otpverify/:userId/:otpPassToken', otpverify);

				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(req.body.password, salt, function (err, hash) {
						if (err) throw err;
						const password = hash;
						const response = User.create({
							username: username,
							password: password,
							otp: OTP,
							otpPassToken: otpPassToken,
							otpPassExp: otpPassExp,
							verfication: false


						})

						// 	  const link1 =
						// 	  "http://" + req.headers.host +
						//   `/reset_password/${user._id}/${user.resetPassToken}`;


						//  console.log(user.password);
						// res.status(201).send(user);
					});

				}
				);
				// const password =  bcrypt.hash(req.body.password, 10)
				//
				const otplink = "http://" + req.headers.host + `/otpverify/${username}${otpPassToken}`

				console.log(JSON.stringify(req.body.username))
				return res.status(201).send({ msg: otplink })
			}

x	
		})
}


exports.otpmobsignup= async(req,res,next) => {	

	const { phone } = req.body
	console.log(req.body.phone)


	if(!mobRegxp1.test(req.body.phone) ||  mobRegxp2.test(req.body.phone) ) {
		// errors.push("invalid email");
		console.log("Invalid Phone number")
		return res.json({
			status: 'error',
			error: 'Invalid Phone Number'
		})
	}
	else{
		User.findOne({ phone: phone })
		.then((user) => {
			if (user) {
				const link1 =
					"http://" + req.headers.host +
					"/login"
				return res
					.status(422)
					.json({ errors: [{ user: "Phone number  already exists signin instead " }], msg: link1 });
			} else {
				// const tok = "JBSWY3DPEHOK3PYP"+ req.body.username
				
				

				const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

				function generateString(length) {
					let result = "";
					const charactersLength = characters.length;
					for ( let i = 0; i < length; i++ ) {
						result += characters.charAt(Math.floor(Math.random() * charactersLength));
					}
					console.log(result)
					// var str = base32.stringify(result) // base32.encode then convert to string
					// var origBuf = base32.parse(str) 	
					
					return (result);
				}
				
				const ans = generateString(16)
				// const tok = "AJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJ"

				const OTP = otpGenerator(ans, {
					digits: 8,
					algorithm: "SHA-512",
					period: 60,
					timestamp: 1465324707000
				})
				const otpPassToken = crypto.randomBytes(20).toString("hex");;
				const otpPassExp = Date.now() + 3000000;
				// 	let password
				//   bcrypt.hash(req.body.password, 10).then(password=>{return password})



				//	router.post('/otpverify/:userId/:otpPassToken', otpverify);

				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(req.body.password, salt, function (err, hash) {
						if (err) throw err;
						const password = hash;
						const response = new User({
							phone: req.body.phone,
							password: password,
							otp: OTP,
							otpPassToken: otpPassToken,
							otpPassExp: otpPassExp,
							verfication: false
						})
						response.save()
						// 	  const link1 =
						// 	  "http://" + req.headers.host +
						//   `/reset_password/${user._id}/${user.resetPassToken}`;


						//  console.log(user.password);
						// res.status(201).send(user);
					});

				}
				);
				// const password =  bcrypt.hash(req.body.password, 10)
				//
				const otplink = "http://" + req.headers.host + `/otpverify/${otpPassToken}`
				return res.status(201).send({ msg: otplink + OTP })
			}


		})
	}
	

	}



