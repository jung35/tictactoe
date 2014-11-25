module.exports = {

    autosubscribe: ['destroy', 'update'],
    attributes: {

        name: 'string',
        lobbies: {
            collection: 'lobby',
            via: 'users',
            dominant: true
        }

    },

    // Hook that gets called after the default publishUpdate is run.
    // We'll use this to tell all public chat rooms about the user update.
    afterPublishUpdate: function (id, changes, req, options) {

        // Get the full user model, including what rooms they're subscribed to
        User.findOne(id).populate('lobbies').exec(function(err, user) {
            // Publish a message to each room they're in.  Any socket that is
            // subscribed to the room will get the message. Saying it's "from" id:0
            // will indicate to the front-end code that this is a systen message
            // (as opposed to a message from a user)
            sails.util.each(user.lobbies, function(lobby) {
                var previousName = options.previous.name == 'unknown' ? 'User #'+id : options.previous.name;

                Lobby.message(lobby.id,
                {
                    lobby:{
                        id:lobby.id
                    },
                    from: {
                        id:0
                    },
                    msg: previousName+" changed their name to "+changes.name

                }, req);
            });

        });

    }

};
