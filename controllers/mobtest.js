

const mobRegxp1 = /^(\+\d{1,3}[- ]?)?\d{10}$/
const mobRegxp2 = /0{5,}/

const number = "+91-8279730193"
if(mobRegxp1.test(number) && ! mobRegxp2.test(number) ){
    console.log("valid number")
}

else
console.log("invalid number")