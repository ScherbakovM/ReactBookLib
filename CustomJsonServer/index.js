var express = require('express')
var cors = require('cors')
var colors = require('colors')
const fs = require('fs')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var app = express()
app.use(cors())

fs.readFile('db.json', { encoding: 'utf-8' }, (error, data) => {
    dataObj = JSON.parse(data)
})

app.get('/lib', function (req, res, next) {
    res.json(dataObj)
})
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/download', jsonParser, function (req, res) {
    console.log(req.body)
})

app.listen(80, function () {
    console.log(colors.bgGreen('CORS-enabled web server listening on port 80'))
})