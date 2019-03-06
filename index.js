const io = require('socket.io')(8080);
io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
const arrUerInfo = [];
io.on('connection', socket =>{
	socket.on('NGUOI_DUNG_DANG_KY',user =>{
		arrUerInfo.push(user);
		
		socket.emit('DANH_SACH_ONLINE',arrUerInfo);
	});

});