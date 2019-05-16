var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var list_usuarios = 0;




//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log('Página principal: /')
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log('Fichero js solicitado')
});

//-- Introducir hoja de estilo
app.get('/micss.css', function(req, res){
  res.sendFile(__dirname + '/micss.css');
  console.log('Fichero css solicitado');
})

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('Lanzando servidor... listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('Nuevo usuario conectado');

  //-- Informar de que alguien se ha unido
  socket.emit("new_message", 'Bienvenido');
  socket.broadcast.emit("new_message", 'Se ha unido un usuario al chat');
  list_usuarios += 1;

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('Usuario desconectado');
    list_usuarios -= 1;
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on("new_message", msg => {
    var split_msg = msg.split(" ")[1];
    //-- Notificarlo en la consola del servidor
    //console.log(split_msg)

    //-- Emitir un mensaje a todos los clientes conectados
    io.emit("new_message", msg);
    console.log(msg)

    switch (split_msg){

      case '/help':
        socket.emit("new_message", "<br>/help: Comandos soportados <br>" + "/list: Número de usuarios conectados <br>" +
        "/hello: El servidor nos devolverá el saludo <br>" + "/date: Devolverá la fecha");
        break;

      case '/list':
        socket.emit("new_message", "El número de usuarios activos es: " + list_usuarios);
        break;

      case '/hello':
        socket.emit("new_message", "¡Hola! Soy el servidor.");
        break;

      case '/date':
        socket.emit("new_message", "Fecha: " + new Date());
        break;

      default:
        break;
    }
  })
});
