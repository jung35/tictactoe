/**
* Lobby.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    autosubscribe: ['destroy', 'update', 'add:users', 'remove:users'],
    attributes: {

        name: 'string',
        users: {
            collection: 'user',
            via: 'lobbies'
        }

    },

    afterPublishRemove: function(id, alias, idRemoved, req) {

        // Get the lobby and all its users
        Lobby.findOne(id).populate('users').exec(function(err, lobby) {
            // If this was the last user, close the lobby.
            if (lobby.users.length === 0) {
                lobby.destroy(function(err) {
                    Lobby.publishDestroy(lobby.id);
                });
            }
        });

    }
};

