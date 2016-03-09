/**
 * Created by HungNguyen on 8/21/15.
 */


var methods = {
        getPlayer: function (playerId) {
            if (playerId != void 0 && (playerId + '').trim() !== '') {
                var params = {playerId: playerId}
                    , player = Collection.findOne(params);

                if (!player) {
                    player = new Player(params);
                    player.save();
                }
                return (player.isOnline) ? {errorMsg: 'This name is invalid or online'} : player;
            }

            return {
                errorMsg: 'Name cannot be empty.'
            };
        },

        updatePlayerStatus: function (playerId, isOnline) {
            var player = Collection.findOne({playerId: playerId});
            if (!playerId || !player)
                return false;

            player.isOnline = isOnline;

            return player.save();

        }
    }
    ;


Meteor.methods(methods);
