const express = require("express")
const app = express()

app.use(express.static('public'))
app.use('/css', express.static('/public/css'))
app.use('/js', express.static('/public/js'))
app.use('/lib', express.static('/public/lib'))


const server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});