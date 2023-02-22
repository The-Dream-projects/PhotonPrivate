const express = require('express');
const path = require('path');
const useragent = require('express-useragent');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


global.config = require('./websiteconfig.json');

// Routes import
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Routes use
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 404 error
app.use(function(req, res, next) {
  res.status(404).send('Not found');
});


const http = require("http").createServer(app)

http.listen(global.config.port, function () {
  console.log('Server is running on port ' + global.config.port);
})

global.io = io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

var Particle = require('particle-api-js'); 
var particle = new Particle();
setInterval(() => {

  
particle.getVariable({ deviceId: '43004d000751373238323937', name: 'smoke', auth: "8fa049a6bec0f90c33a85aa67cf5398c96ec651e" }).then(function(data) {
        global.io.emit('ping', {
            val: data.body.result != undefined ? data.body.result : 0
        });
      }, function(err) {
        global.io.emit('ping', {
            val: 0
        });
      });

}, 500);


module.exports = app;
