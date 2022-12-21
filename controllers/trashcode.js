//   exports.otpsignup =\\ (req,res, next) =>{
const bcrypt = require('bcryptjs')	


const bc = bcrypt.genSalt(10, function (err, salt) {
	bcrypt.hash("ldkfdj923", salt, function (err, hash) {
	  if (err) throw err;
	  const password = hash;
	 return password
	  
	
	});

	

	console.log(bc);
  });

	
// 	const	otp  = otpGenerator("JBSWY3DPEHOK3PYP", {
// 		digits: 8,
// 		algorithm: "SHA-512",
// 		period: 60,
// 		timestamp: 1465324707000
// })
// 	let { username }	= req.body;
// 	let errors = [];

// 	if(!req.body.username)
// 	errors.push("Email required");

// 	if (!emailRegxp.test(req.body.username))	 {
// 		 errors.push("invalid email");
// 		console.log("Invalid email")

// 		return res.json({
// 		  status: 'error',
// 		  error: 'Invalid Email'
// 		})
// 	  }

// 	  if (errors.length > 0) 
// 		res.status(422).json({ errors: errors });
	  

// 	  User.findOne({ username: username })
//     .then((user) => {
//       if (user) 
//         res.status(400).send("User Already Registered. Signup using different mail");
		
// 		// if(!user){
		
// 		// module.exports = otp
// 		// 	}
		
        
// 	})
// 	console.log('OTP is '+ otp);

// 	res.send(otp);


// }

// module.exports.otpsignup = (req, res, next) => {
// 	let { username } = req.body;
// 	let errors = [];
// 	if (!username) {
// 	  errors.push("Phone No. Required");
// 	}
// 	if (errors.length > 0) {
// 	  res.status(422).json({ errors: errors });
// 	}
// 	User.findOne({ username: username })
// 	  .then((user) => {
// 		if (user) {
		  
// 		  const OTP = otpGenerator(6, {
// 			digits: true,
// 			lowerCaseAlphabets: false,
// 			upperCaseAlphabets: false,
// 			specialChars: false,
// 		  });
// 		  console.log(OTP);
// 		  User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true })
// 			.then((data) => {
// 			  res.status(200).json({
// 				data: data,
// 			  });
// 			})
// 			.catch((err) => {
// 			  res.status(500).json({ error: err });
// 			  console.log(err);
// 			});
// 		} else {
// 		  const OTP = otpGenerator(6, {
// 			digits: true,
// 			lowerCaseAlphabets: false,
// 			upperCaseAlphabets: false,
// 			specialChars: false,
// 		  });
// 		  console.log(OTP);
// 		  /*  to send otp as a sms use local sms gateway {
  
// 		  } */
  
// 		  const user = new User({
// 			username: username,
// 			otp: OTP,
// 			source: "OTP",
// 		  });
// 		  const token = jwt.sign(
// 			{ userId: user._id, user },
// 			process.env.TOKEN,
// 			{
// 			  expiresIn: "1d",
// 			}
// 		  );
// 		  user.token = token;
// 		  user.save();
// 		  res.status(200).json({
// 			message: "OTP SEND SUCESSFULLY  :" + OTP,
// 		  });
// 		}
// 	  })
// 	  .catch((err) => {
// 		res.status(500).json({ error: err });
// 		console.log(err);
// 	  });
//   };
  
  /*  VERIFY OTP  */
//   module.exports.verifyotp = (req, res, next) => {
// 	let { phone } = req.body;
// 	let errors = {};
// 	if (!phone) {
// 	  errors.push("Phone No. Required");
// 	}
// 	if (errors.length > 0) {
// 	  res.status(422).json({ errors: errors });
// 	}
// 	User.find({ phone: phone })
// 	  .then((otp) => {
// 		if (otp.length === 0) {
// 		  res.status(400).send("OTP Expired");
// 		}
// 		const rightOtpFind = otp[otp.length - 1];
// 		if (req.body.otp === rightOtpFind.otp) {
// 		  if (rightOtpFind.phone === req.body.phone) {
// 			// res.status(200).send(otp);
// 			// const user = new User(_.pick(req.body, ["phone"]));
// 			// User.findById(user._id).then((dta) => res.json({ message: dta }));
// 			// console.log(user._id);
// 			// user.save();
// 			const token = jwt.sign(
// 			  { userId: otp[0]._id, otp },
// 			  process.env.TOKEN,
// 			  {
// 				expiresIn: "1d",
// 			  }
// 			);
// 			User.findByIdAndUpdate(
// 			  otp[0]._id,
// 			  { token: token },
// 			  { new: true }
// 			).then((user) => {
// 			  res.status(200).json({
// 				data: user,
// 				token,
// 			  });
// 			});
  
// 			// // User.deleteMany({ phone: rightOtpFind.phone });
// 			res.status(200).json({
// 			  message: "USer Registration Sucessfull",
// 			  token: token,
// 			  data: otp,
// 			});
// 		  }
// 		} else {
// 		  res.status(400).send("Otp didnt matched");
// 		}
// 	  })
// 	  .catch((err) => {
// 		res.status(500).json({ error: err });
// 		console.log(err);
// 	  });
//   };

//  module.exports = otp

// try {
	// 	const	OTP  = otpGenerator("JBSWY3DPEHOK3PYP", {
	// 				digits: 8,
	// 				algorithm: "SHA-512",
	// 				period: 60,
	// 				timestamp: 1465324707000
	// 		})
	  
	// //   const response = await User.create({
	// // 	username,
	// // 	password,
		
	// //   })
	//   return res.status(200).send({ msg: OTP });
	//   // console.log('User created successfully: ', response)
	// } catch (error) {
	//   if (error.code === 11000) {
	// 	// duplicate key
	// 	// console.log(JSON.stringify(error));
	// 	return res.json({ status: 'error', error: 'Username already in use' })
	//   }
	//   throw error
	// }
  
	// res.json({ status: 'ok' })
  
	///****************************** CHANGE PASSWORD *********************************************/

// app.post('/api/change-password', async (req, res) => {
// 	const { token, newpassword: plainTextPassword } = req.body

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	try {
// 		const user = jwt.verify(token, JWT_SECRET)

// 		const _id = user.id

// 		const password = await bcrypt.hash(plainTextPassword, 10)

// 		await User.updateOne(
// 			{ _id },
// 			{
// 				$set: { password }
// 			}
// 		)
// 		console.log('password changed')
// 		res.json({ status: 'ok' })

// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: ';))' })
// 	}
// })
//-------------------------------CHANGE PASSWORD------------------------------------------------------//



//******************************* LOG IN************************************************* */

// app.post('/api/login', async (req, res) => {
// 	const { username, password } = req.body
// 	const user = await User.findOne({ username }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })
//----------------------------------- LOG IN -----------------------------------------------//


// //************************************ REGISTER*************************************************** */

// app.post('/api/register', async (req, res) => {
// 	const { username, password: plainTextPassword } = req.body
// 	console.log(req.body.password)

// 	// if (!username || typeof username !== 'string') {
// 	// 	return res.json({ status: 'error', error: 'Invalid username' })
// 	// }
// 	if (!emailRegxp.test(req.body.username)) {
//         // errors.push("invalid email");
//         console.log("Invalid email")
//         return res.json({
// 			status: 'error',
// 			error: 'Invalid Email'
// 		})
//       }
// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	const password = await bcrypt.hash(plainTextPassword, 10)

// 	try {
// 		const response = await User.create({
// 			username,
// 			password
// 		})
// 		console.log('User created successfully: ', response)
// 	} catch (error) {
// 		if (error.code === 11000) {
// 			// duplicate key
// 			// console.log(JSON.stringify(error));
// 			return res.json({ status: 'error', error: 'Username already in use' })
// 		}
// 		throw error
// 	}

// 	res.json({ status: 'ok' })
// })

//---------------------------------  REGISTER  -------------------------------------------------------//

//**********************************  LOGOUT ********************************************************** */




// app.post('/logout', async (req, res) => {
// 	const payload = {};
// 	jwt.sign(payload, "", { expiresIn: 1 }, (logout, err) => {
// 		if (logout) {
// 			console.log(logout);
// 			res.send({ msg: "You have been Logged Out" + payload });
// 		} else {
// 			res.send({ msg: "Error" });
// 		}
// 	});

// });

//-----------------------------------  LOGOUT  -----------------------------------------------------------------//