var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3080);



io.on('connect', function (socket) {
  function countTimer() {
    let i = 10

    setTimeout(function go() {
      if (i > 0) {
        setTimeout(go, 1000);
      } else {
        socket.emit('startBaraban', Math.round(Math.random()*43));
        return false
      }
      i -= 1
      socket.emit('nextSpin', i);
    }, 0)
  }
  countTimer()
  const countInterval = setInterval(() => {
    countTimer()
  }, 17000)
    
  socket.on('disconnect', function () {
    clearInterval(countInterval)
  });
});
