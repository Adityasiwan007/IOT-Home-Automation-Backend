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

  app.get('/carparking', function(req,res,next){
    data=req.query.id
    socket.broadcast.emit('carparking', data)
    res.send('Hello from Server to Parking: '+data);
  });

  app.get('/door', function(req,res,next){
    let dataDoor=req.query.id
    socket.broadcast.emit('door', dataDoor)
    res.send('Hello from Server to door: '+dataDoor);
  });

  app.get('/mailbox', function(req,res,next){
    let dataMail=req.query.id
    socket.broadcast.emit('mailbox', dataMail)
    res.send('Hello from Server to Mail: '+dataMail);
  });
  
  app.get('/garden', function(req,res,next){
    let dataGarden=req.query.id
    socket.broadcast.emit('garden', dataGarden)
    res.send('Hello from Server to garden: '+dataGarden);
  });
  
  app.get('/solar', function(req,res,next){
    let dataSolar=req.query.id
    socket.broadcast.emit('solar', dataSolar)
    res.send('Hello from Server to Solar: '+dataSolar);
  });
  



  socket.on('disconnect', function () {
     delete clients[socket.id];
     console.log('A user disconnected');
  });

});



app.use('/', express.static(__dirname + '/'));


http.listen(port, () => {
  console.log('listening on *:8005');
});
