$('.login-modal').modal({
    backdrop: 'static',
    keyboard: false,
    show: true
});

io.socket.on('connect', function socketConnected() {

    io.socket.on('hello', function(data) {
        console.log("APP: handshake");
        user_me_updateName(data);
    });


    io.socket.on('lobby', function messageReceived(message) {
        console.log("APP: lobby message");
        console.log(message);
    });


    io.socket.on('user', function messageReceived(message) {
        console.log(message);

        switch (message.verb) {

            case 'created':
                user_global_addUser(message);
                break;

            case 'updated':
                user_global_updateUser(message);
                break;

            case 'destroyed':
                user_global_removeUser(message);
                break;
        }
    });

    io.socket.get('/user', user_global_userList);





    $(".set-username-input").keypress(function (e) {
        if (e.which == 13) {
            if(e.currentTarget.value.length == 0 || e.currentTarget.value == window.me.name) {
                return;
            }
            console.log('APP: Sending name');

            user_io_updateName();
            var $login_modal = $('.login-modal');

            $login_modal.data('bs.modal').options.keyboard = true;
            $login_modal.data('bs.modal').options.backdrop = true;
            $login_modal.modal('hide');
        }
    });
});
