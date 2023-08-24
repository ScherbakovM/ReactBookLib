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
    res.send(Books)
    res.end
})
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/download', jsonParser, function (req, res) {
    console.log(typeof(Books))
    Books.push(req.body)
    console.log(Books)
    write(Books)
    res.send('ok')
    res.end
})

app.post('/dell', jsonParser, function (req, res) {
    deleteBook(req.body.nameCard)
})

app.listen(80, function () {
    console.log(colors.bgGreen('CORS-enabled web server listening on port 80'))
})

function write(arg) {
    fs.writeFileSync("db.json", JSON.stringify(arg), {encoding : 'utf-8', flag : 'w'})
}

function deleteBook(cardName) {
    const result = Books.filter((Books) => Books.nameCard != cardName );
    console.log(Books)
    write(result)
}
