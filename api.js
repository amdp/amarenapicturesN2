var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const nodemailer = require('nodemailer')
const jimp = require('jimp')
const fs = require('fs')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

const mypool = pool.promise()

app.get('/video', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM `amareel`'
    let param = []

    if (req.query.videoid) {
      query += ' WHERE `id`=? LIMIT 1'
      param = [req.query.videoid]
    } else {
      query += ' WHERE `visible` = ? ORDER BY `id` DESC'
      param = ['1']
    }
    const [rows] = await mypool.execute(query, param)
    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
})

app.get('/brand', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM `brand` WHERE `visible` = ? ORDER BY `id` DESC'
    let param = ['1']
    const [rows] = await mypool.execute(query, param)
    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
})

app.post('/video', async (req, res, next) => {
  if (!req.body.old) {
    try {
      let query = 'SELECT * FROM `amareel` WHERE `video`=? LIMIT 1'
      let param = [req.body.video]
      const [rows] = await mypool.execute(query, param)
      if (rows.length > 0) { return res.status(200).send('exists') }
    } catch (err) {
      next(err)
    }
    if (!req.body.id) { req.body.id = false }
    try {
      let query = 'insert into amareel values (?,?,?,?,?,?,?,?,?,?,?,DEFAULT,DEFAULT)'
      let params = [
        req.body.id,
        req.body.visible,
        req.body.video,
        req.body.title,
        req.body.year,
        req.body.brand,
        req.body.agency,
        req.body.production,
        req.body.direction,
        req.body.abstract,
        req.body.abstractit,
      ]
      const [rows] = await mypool.execute(query, params)
      res.status(200).send(rows)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'UPDATE amareel set `visible` = ?, `video` = ?, `title` = ?, `year` = ?, `brand` = ?, `agency` = ?, `production` = ?, `direction` = ?, `abstract` = ?, `abstractit` = ? where `id` = ?'
      let param = [req.body.visible, req.body.video, req.body.title, req.body.year, req.body.brand, req.body.agency, req.body.production, req.body.direction, req.body.abstract, req.body.abstractit, req.body.id]
      const [rows] = await mypool.execute(query, param)
      res.status(200).send(rows)
    } catch (err) {
      next(err)
    }
  }
})

app.post('/brand', async (req, res, next) => {
  if (!req.body.old) {
    try {
      let query = 'SELECT * FROM `brand` WHERE `brand`=? LIMIT 1'
      let param = [req.body.brand]
      const [rows] = await mypool.execute(query, param)
      if (rows.length > 0) { return res.status(200).send('exists') }
    } catch (err) {
      next(err)
    }
    if (!req.body.id) { req.body.id = false }
    try {
      let query = 'insert into brand values (?,?,?,?,DEFAULT,DEFAULT)'
      let params = [req.body.id, req.body.brand, req.body.image, req.body.visible]
      const [rows] = await mypool.execute(query, params)
      res.status(200).send(rows)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      let query = 'UPDATE brand set `id` = ?, `image` = ?, `visible` = ? where `brand` = ?'
      let param = [req.body.id, req.body.image, req.body.visible, req.body.brand]
      const [rows] = await mypool.execute(query, param)
      res.status(200).send(rows)
    } catch (err) {
      next(err)
    }
  }
})

app.post('/imagevideofile', async function (req, res, next) {
  if (req.files) {
    let uploadPath = './static/v/' + req.files.video.name
    try {
      await req.files.video.mv(uploadPath)
    } catch (err) {
      return next(err)
    }
    uploadPath = './static/i/' + req.files.image.name
    try {
      await req.files.image.mv(uploadPath)
    } catch (err) {
      return next(err)
    }
    try {
      const imgfile = await jimp.read(uploadPath)
      await imgfile
        .resize(1000, 562)
        .quality(60)
        .write(uploadPath)
    } catch (err) {
      return next(err)
    }
  }
  res.send({ status: 'OK', id: req.body.id })
})

app.post('/brandfile', async function (req, res, next) {
  if (req.files) {
    let uploadPath = './static/b/' + req.files.brand.name
    try {
      await req.files.brand.mv(uploadPath)
    } catch (err) {
      return next(err)
    }
    try {
      const imgfile = await jimp.read(uploadPath)
      await imgfile
        .resize(256, jimp.AUTO)
        .resize(jimp.AUTO, 256)
        .quality(60)
        .write(uploadPath)
    } catch (err) {
      return next(err)
    }
  }
  res.send({ status: 'OK', id: req.body.id })
})

app.post('/deletevideo', async function (req, res, next) {
  let uploadPath = './static/v/' + req.body.video + '.mp4'
  try {
    fs.unlinkSync(uploadPath)
  } catch (err) {
    return next(err)
  }
  uploadPath = './static/i/' + req.body.video + '.jpg'
  try {
    fs.unlinkSync(uploadPath)
  } catch (err) {
    return next(err)
  }
  try {
    let query = 'DELETE FROM `amareel` WHERE `id`=? LIMIT 1'
    let param = [req.body.id]
    await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  res.status(200).send('OK')
})

app.post('/deletebrand', async function (req, res, next) {
  let uploadPath = './static/b/' + req.body.image
  try {
    fs.unlinkSync(uploadPath)
  } catch (err) {
    return next(err)
  }
  try {
    let query = 'DELETE FROM `brand` WHERE `brand`=? LIMIT 1'
    let param = [req.body.brand]
    await mypool.execute(query, param)
  } catch (err) {
    next(err)
  }
  res.status(200).send('OK')
})



app.post('/contactemail', function (req, res) {
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
    to: '"Amarena Pictures" <amarena@amarenapictures.com>',
    replyTo: `"${req.body.formName}" <${req.body.formEmail}>`,
    subject: 'From Amarena Pictures Website - ' + req.body.formSubject,
    text:
      `Name: ${req.body.formName}\n` +
      `Email: ${req.body.formEmail}\n\n` +
      `Message: \n\n${req.body.formBody}`
  }
  transporter
    .sendMail(mailOptions)
    .then(info => {
      console.log('Message %s sent: %s', info.messageId, info.response)
      res.status(200).json({
        message:
          `Thank you, ${req.body.formName}, for your message!<br/>` +
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

/////////////////// USERS //////////////////////

app.post('/login', async function (req, res, next) {
  try {
    let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
    let param = [req.body.email]
    const [user] = await mypool.execute(query, param)
    if (user.length == 0) {
      return res.status(401).send('wrong user/password')
    }
    logincheck(user[0])
  } catch (err) {
    next(err)
  }
  async function logincheck(user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      try {
        let accessToken = jwt.sign({ id: user.id }, process.env.JWTSECRET, {
          expiresIn: '2h'
        })
        res.send({ token: { accessToken } })
      }
      catch (err) {
        next(err)
      }
    } else {
      return res.status(401).send('wrong user/password')
    }
  }
})

app.post('/logout', (req, res) => {
  res.send({ status: 'OK' })
})

app.get('/user', async function (req, res, next) {
  req.headers.authorization = req.headers.authorization.slice(7)
  if (req.headers.authorization == 'undefined') {
    return res.status(500).send('Headers sent undefined')
  } else {
    try {
      jwt.verify(req.headers.authorization, process.env.JWTSECRET)
    } catch (err) {
      return res.status(401).send(err + ': Auth Token Wrong or Expired')
      // return axios({
      //   method: 'post',
      //   url: process.env.DBURL + '/logout'
      // })
    }
    let id = jwt.decode(req.headers.authorization)
    try {
      let query = 'SELECT * FROM `user` AS `user` WHERE `user`.`id` =  ?'
      let param = [id.id]
      const [user] = await mypool.execute(query, param)
      res.send({ user: user[0] })
    } catch (err) {
      next(err)
    }
  }
})

app.post('/recoverpassword', async function (req, res, next) {
  if (req.body.email) {
    try {
      let query = 'SELECT * FROM `user` WHERE `user`.`email`= ? LIMIT 1'
      let param = [req.body.email]
      const [user] = await mypool.execute(query, param)
      recoverpassword(user[0])
    } catch (err) {
      next(err)
    }
  } else if (req.body.token) {
    setuppassword()
  } else {
    res.status(500).send('No mail nor token, exiting.')
  }
  async function recoverpassword(user) {
    //this happens when the users want to change their password
    if (user) {
      let token = jwt.sign(
        {
          id: user.id,
          newpassword: req.body.password
        },
        process.env.JWTSECRET,
        { expiresIn: '2h' }
      )
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASSWORD
        }
      })
      let mailOptions = {
        from: '"Amarena Pictures Website" <amarena@amarenapictures.com>',
        to: req.body.email,
        subject: 'Change your Amarena Pictures password',
        text:
          'Click here to set the new password:\n' +
          process.env.URLHOME +
          '/recover?jws=' +
          token +
          '\nOr please just ignore this email'
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).send(err)
          return console.error(err)
        }
        console.log(
          'Message %s to %s sent: %s',
          info.messageId,
          mailOptions.to,
          info.response
        )
        res.status(200).send(info.response + ' to ' + mailOptions.to)
      })
    } else {
      res.status(500).send('No user with this email')
    }
  }
  async function setuppassword() {
    // this happens instead once he clicks on the confirmation link to change his password
    try {
      jwt.verify(req.body.token, process.env.JWTSECRET)
    } catch (err) {
      return res.status(401).send(err + ': Auth Token Wrong or Expired')
    }
    var { id, newpassword } = jwt.decode(req.body.token)
    try {
      let newhashedpassword = await bcrypt.hash(newpassword, 10)
      let query = 'UPDATE `user` SET `password`=? WHERE `id`=?'
      let param = [newhashedpassword, id]
      await mypool.execute(query, param)
      res.status(200).send('updated')
    } catch (err) {
      next(err)
    }
  }
})

//error function triggered by next
app.use(function (err, req, res, next) {
  console.log('body: ' + JSON.stringify(req.body))
  console.log('query: ' + JSON.stringify(req.body))
  console.log('nexterr: ' + JSON.stringify(err) + err.stack)
  if (res.headersSent) {
    return next(err) //check  this out
  }
  res.status(500).send(err.stack)
})


module.exports = {
  path: '/api',
  handler: app
}
