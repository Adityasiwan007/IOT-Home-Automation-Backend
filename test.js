var express= require('express');
const app = module.exports.app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var fs = require('fs');
var btoa = require('btoa');
const port = process.env.PORT || 8005;
var clients = {};
let data='start'

app.get('/checkLive',async (req,res,next)=>{
    let pro_time = "Welcome to the OutSide Home Automation.)";
    res.send(pro_time);
});




io.on('connection', function(socket) {

  clients[socket.id] = socket;
  console.log('A user connected: '+ socket.id);

  app.get('/carparking', function(req,res,next){
    data=req.query.id
    if(data<=6)
    {
      data='Stop the car'
    }
    else if(data >30)
    {
      data='No Car Found'
    }
    socket.broadcast.emit('carparking', data)
    res.send('Hello from Server to Parking: '+data);
  });

  app.get('/door', function(req,res,next){
    let dataDoor=req.query.id
    socket.broadcast.emit('door', dataDoor)
    res.send('Hello from Server to door: '+dataDoor);
  });
  
  
    
  app.post('/mailbox', function(req,res,next){
    var binary = '';
    // console.log("Headers: ",req.headers);

    // console.log("Body: : ",req);

    // var f = fs.createWriteStream('out.jpeg');
    
      //         var bytes = [].slice.call(new Uint8Array(data));
      //         bytes.forEach((b) => binary +=b);
      //         //binary = [...binary]+[...bytes]
      //         console.log(bytes); 
      //    });
      //     req.on('end', function () {
      //     console.log(btoa(binary));
      //     socket.broadcast.emit('mailbox',btoa(binary))
      //   });
      
    //     req.on('uncaughtException', function (err) {
    //       console.error(err.stack); // either logs on console or send to other server via api call.
    //       req.exit(1)
    //     })


    // let dataMail="Testing"
    // socket.broadcast.emit('mailbox', dataMail)
    let dataDoor=req.url.slice(12);
    console.log(dataDoor);
    socket.broadcast.emit('mailbox', dataDoor)
    res.send('Hello from Server to Mail: Test');
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


http.listen(port,'0.0.0.0', () => {
  console.log('listening on *:8005');
});
