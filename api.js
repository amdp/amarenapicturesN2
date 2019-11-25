var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const nodemailer = require('nodemailer')
//const jimp = require('jimp')
const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQLUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const myPool = pool.promise()
/////// GET ///////

app.get('/videos', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM `amareel`'
    const [rows] = await myPool.query(query)
    res.send(rows)
  } catch (err) {
    next(err)
  }
})
app.get('/brands', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM `brands`'
    const [rows] = await myPool.query(query)
    res.send(rows)
  } catch (err) {
    next(err)
  }
})

/////// UPDATE ///////

/////// POST ///////

// helper function to verify reCaptch token
// isValidRecaptchaToken = token => {
//   const message = {
//     secret: "6Lebn7EUAAAAAJB91cWRvPPJc_EMyk-OppYs9H65",
//     response: token
//   };
//   const response = {};
//   axios
//     .post('URL: https://www.google.com/recaptcha/api/siteverify', message)
//     .then(res => (response = res))
//     .catch(err => console.log(err));
//   console.log(response);
//   return response.status;
// };

app.post('/contactemail', function(req, res) {
  // if (!isValidRecaptchaToken(req.body.recaptchaToken)) {
  //   res.status(500).json({
  //     message: 'Invalid Captcha! Please try again.'
  //   });
  // }
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD
    }
  }) /* to add html in mailOptions use " html: '<b>test</b>' " */
  const mailOptions = {
    from: req.body.formEmail,
    to: '"Cooperacy" <cooperacy@cooperacy.org>',
    // conveniently replies to the submitter of the form's email
    replyTo: `"${req.body.formName}" <${req.body.formEmail}>`,
    subject: req.body.formSubject,
    text:
      `Name: ${req.body.formName}\n` +
      `Email: ${req.body.formEmail}\n\n` +
      `Message: \n\n${req.body.formBody}`
  }
  // console.log(mailOptions);
  transporter
    .sendMail(mailOptions)
    .then(info => {
      console.log('Message %s sent: %s', info.messageId, info.response)
      res.status(200).json({
        message:
          `Thank you ${req.body.formName} for your message!<br/>` +
          `We'll get in touch as soon as possible.<br />`
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message:
          `An error occured ${req.body.formName}!<br/>` +
          `Please try again later.`
      })
    })
})

module.exports = {
  path: '/api',
  handler: app
}
