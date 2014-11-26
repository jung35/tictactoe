function user_me_updateName(data) {
    console.log("USER: updating local user info");
    window.me = data;
    if(me.name !== null) {
        $('.set-username-input').val(me.name);
        $('button.signin').html('Hello, <b>'+ data.name +'</b>');
    }
}

function user_io_updateName() {
    io.socket.put('/user/'+window.me.id, {name: $('.set-username-input').val()}, function(data) {
        console.log('USER: recieved name');
        user_me_updateName(data);
    });
}

function user_global_addUser(user) {
    if(user.data.name !== null) {
        $('#global-users').find('ul.display-user-list').append('<li class="user_'+ user.id +'">'+ user.data.name +'</li>');
    }
}

function user_global_updateUser(user) {
    var $user_element = $('#global-users').find('.user_'+ user.id);
    if($user_element.length > 0) {
        $user_element.html(user.data.name);
    } else {
        user_global_addUser(user);
    }
}

function user_global_removeUser(user) {
    $('#global-users').find('.user_'+ user.id).remove();
}

function user_global_userList(users) {
    users.forEach(function(user) {
        user_global_addUser({
            id: user.id,
            data: {
                name: user.name
            }
        });
    });
}
