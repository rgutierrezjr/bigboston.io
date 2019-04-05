const express = require("express")
const compression = require("compression")

const app = express()
app.use(compression())

const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use('/css', express.static('/public/css'))
app.use('/js', express.static('/public/js'))
app.use('/lib', express.static('/public/lib'))
app.use('/img', express.static('/public/img'))


app.listen(port, () => {
    console.log("Server started at http://localhost:%s", port);
});