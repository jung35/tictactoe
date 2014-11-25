$('.login-modal').modal({
    backdrop: 'static',
    keyboard: true
}).show();

io.socket.on('connect', function socketConnected() {

    io.socket.on('hello', function(data) {
      window.me = data;
      updateMyName(data);
    });

    $(".set-username-input").keypress(function (e) {
      if (e.which == 13) {
        console.log('Sending name');
        updateName();
      }
    });

});
