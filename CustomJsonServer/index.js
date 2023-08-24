var express = require('express')
var cors = require('cors')
var colors = require('colors')
const fs = require('fs')
const Books = require('./db.json')
var bodyParser = require('body-parser')
const { type } = require('os')

var jsonParser = bodyParser.json()
var app = express()
app.use(cors())


app.get('/lib', function (req, res, next) {
    fs.readFile('db.json', { encoding: 'utf-8' }, (error, data) => {
        dataObj = JSON.parse(data)
        res.json(dataObj)
    })

})
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/download', jsonParser, function (req, res) {
    console.log(typeof(Books))
    Books.push(req.body)
    console.log(Books)
    write()
    res.send('ok')
    res.end
})

app.listen(80, function () {
    console.log(colors.bgGreen('CORS-enabled web server listening on port 80'))
})

function write() {
    fs.writeFileSync("db.json", JSON.stringify(Books), {encoding : 'utf-8', flag : 'w'})
}
