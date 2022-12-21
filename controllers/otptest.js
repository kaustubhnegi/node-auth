const otpGenerator = require('totp-generator');
const st = "JBSWY3DPEHOK3PYP"
const otp  = otpGenerator(st, {
    digits: 6,
    algorithm: "SHA-512",
    period: 60,
    timestamp: Date.now()

});

console.log(otp)