/**
 * LobbyController
 *
 * @description :: Server-side logic for managing lobbies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Join a chat lobby -- this is bound to 'post /lobby/:lobbyId/users'
    join: function(req, res, next) {
        // Get the ID of the lobby to join
        var lobbyId = req.param('lobbyId');
        // Subscribe the requesting socket to the "message" context,
        // so it'll get notified whenever lobby.message() is called
        // for this lobby.
        Lobby.subscribe(req, lobbyId, ['message']);
        // Continue processing the route, allowing the blueprint
        // to handle adding the user instance to the lobby's `users`
        // collection.
        return next();
    },

    // Leave a chat lobby -- this is bound to 'delete /lobby/:lobbyId/users'
    leave: function(req, res, next) {
        // Get the ID of the lobby to join
        var lobbyId = req.param('lobbyId');
        // Unsubscribe the requesting socket from the "message" context
        Lobby.unsubscribe(req, lobbyId, ['message']);
        // Continue processing the route, allowing the blueprint
        // to handle removing the user instance from the lobby's
        // `users` collection.
        return next();
    }
};

