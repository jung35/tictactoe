function user_me_updateName(data) {
    console.log("USER: updating local user info");
    window.me = data;
    if(me.name !== null) {
        $('.set-username-input').val(me.name);
        $('button.signin').html('Hello, <b>'+ data.name +'</b>');
    }
}

function user_io_updateName() {
    // Use the Sails blueprint action to update the user
    io.socket.put('/user/'+window.me.id, {name: $('.set-username-input').val()}, function(data) {
        console.log('USER: recieved name');
        user_me_updateName(data);
    });
}
