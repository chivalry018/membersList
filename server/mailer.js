var nodemailer = require('nodemailer');

// var smtpConfig = {
// 	host: 'smtp.office365.com',
// 	port: 587,
// 	secureConnection: false,
// 	auth: {
// 		user: 'support@zeairtravel.ph',
// 		pass: 'zeair@8222019'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// }


// var smtpConfig = {
// 	//host: 'smtp.gmail.com',
// 	service: 'gmail',
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		user: 'healthandbeautyrepublic@gmail.com',
// 		pass: 'hbr7302020'
// 	},
// 	tls: {
// 	        rejectUnauthorized: false
// 	    }
// }

var smtpConfig = {
	host: 'mail.privateemail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'support@metravels.io',
		pass: ''
	},
	tls: {
		rejectUnauthorized: false
	}
}


var mailer = nodemailer.createTransport(smtpConfig);
module.exports = mailer