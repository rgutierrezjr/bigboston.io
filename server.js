const express = require("express")
const compression = require("compression")
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser')

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use('/css', express.static('/public/css'))
app.use('/js', express.static('/public/js'))
app.use('/lib', express.static('/public/lib'))
app.use('/img', express.static('/public/img'))

const gmailuser = process.env.GMAILUSER
const gmailpass = process.env.GMAILPASS

app.post('/contactRequest', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: gmailuser,
            pass: gmailpass
        }
    });
    let mailOptions = {
        from: `${req.body.name}`, // sender address,
        to: req.body.to, // list of receivers
        subject: 'big boston io, contact request', // Subject line
        html: `<b>
                    <p>
                        <strong>Message:</strong> ${req.body.message}<br/>
                        <strong>Email:</strong> ${req.body.email}<br/>
                        <strong>Number:</strong> ${req.body.number}<br/>

                    </p>

                </b>`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log("Server started at http://localhost:%s", port);
});