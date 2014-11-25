function updateMyName(me) {
  $('.set-username-input').val(me.name == 'unknown' ? 'User #' + me.id : me.name);
}

function updateName() {
  // Use the Sails blueprint action to update the user
  io.socket.put('/user/'+window.me.id, {name: $('.set-username-input').val()});
}
