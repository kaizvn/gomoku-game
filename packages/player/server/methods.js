/**
 * Created by HungNguyen on 8/21/15.
 */


var methods = {
    getPlayer: function (playerId) {
        var params = {playerId: playerId};
        var player = Collection.findOne(params);
        if (!player) {
            player = new Player(params);
            player.save();
        }

        return player;
    },
    getPlayerInfo: function (players) {
        if (!players)
            return new Array(2);

        return Collection.find({playerId: {$in: players}}).fetch();

    },
    updatePlayerStatus: function (playerId, isOnline) {
        var player = Collection.findOne({playerId: playerId});
        if (!playerId || !player)
            return false;

        player.isOnline = isOnline;

        return player.save();

    }
};


Meteor.methods(methods);
