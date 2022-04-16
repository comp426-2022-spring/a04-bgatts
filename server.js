import { flipper } from './modules/flip.js';
import { multFlips } from './modules/flips.js';
import { guesser_H } from './modules/guess-flip-H.js';
import { guesser_T } from './modules/guess-flip-T.js';


import express from "express"
import minimist from "minimist"
import Database from "better-sqlite3"


const app = express()
const args = minimist(process.argv.slice(2))


args["port"]
args["help"]

if (args["help"] || args['h']){
    let helpMessage = `--port	Set the port number for the server to listen on. Must be an integer
    between 1 and 65535.

    --debug	If set to true, creates endlpoints /app/log/access/ which returns
    a JSON access log from the database and /app/error which throws 
    an error with the message "Error test successful." Defaults to 
    false.

    --log		If set to false, no log files are written. Defaults to true.
    Logs are always written to database.`

    console.log(helpMessage)
    process.exit(0)
}





const db = new Database('log.db')                 //set up database
//no longer need to run since already created
//const statments = 'CREATE TABLE LogData (remoteadder, remoteuser, time, method, url, protocol, httpversion, status, refer, useragent)'
//db.exec(statments)

//module.exports = db




app.use( (req, res, next) => {
    console.log('hi there')
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }

    const input = db.prepare('INSERT INTO LogData (remoteadder, remoteuser, time, method, url, protocol, httpversion, status, refer, useragent) VALUES(?,?,?,?,?,?,?,?,?,?)')
    const info = input.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)

    next()

})
//get log data




//app.use((req, res, next) => {
//    res.status(404)
//  })

app.get('/',(req,res)=>{

})


app.use(function(req, res, next){
    res.setHeader('Content-Type','text/html')
    next();
});

// Default response for any other request
app.use(function(req, res, next){
    next()
    res.status(404).send('404 NOT FOUND')
    //console.log('here we go agian')
});




app.get('/app/',(req,res)=>{
    res.status(200).send('200 OK')
})


app.get('/app/flip/',(req,res)=>{
    res.status(200)
    let flip = flipper()
    res.send(flip)
})

app.get('/app/flips/:number',(req,res)=>{
    res.status(200)
    let num = req.params.number
    let flips = multFlips(num)
    res.send({flips: flips[0], results: flips[1]})

})

app.get('/app/flip/call/heads',(req,res)=>{
    res.status(200)
    let guess = guesser_H()
    res.send(guess)
})


app.get('/app/flip/call/tails',(req,res)=>{
    res.status(200)
    let guess = guesser_T()
    res.send(guess)
})


const port = args.port || 5000;
//app.listen(port, ()=> console.log(`listneing on port ${server}...`))

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});