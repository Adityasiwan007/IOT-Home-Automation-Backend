var express= require('express');
const app = module.exports.app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8005;
var clients = {};
let data='start'

app.get('/checkLive',async (req,res,next)=>{
    let pro_time = "Yes, You are Live in heroku. Welcome to the Home Automation BackEnd Testing :)";
    res.send(pro_time);
});




io.on('connection', function(socket) {

  clients[socket.id] = socket;
  console.log('A user connected: '+ socket.id);

  app.get('/test', function(req,res,next){
    data=`ID:` + req.query.id
    socket.emit('Ping', data);
    res.send(data);
  });

  socket.emit('Ping', data);


  socket.on('disconnect', function () {
     delete clients[socket.id];
     console.log('A user disconnected');
  });

});



app.use('/', express.static(__dirname + '/'));


http.listen(port, () => {
  console.log('listening on *:8005');
});
