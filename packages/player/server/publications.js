/**
 * Created by HungNguyen on 8/21/15.
 */


//connectionModel : { users : [set], count : num}

var publications = {
    currentPlayer: function (id) {
        return id ? Collection.find({playerId: id}) : [];
    },

    currentPlayers: function (roomId) {
        if (!roomId)
            return [];

        var roomInfo = Meteor.room.findOne({_id: roomId});
        return roomInfo ? Collection.find({playerId: {$in: [roomInfo.player01, roomInfo.player02]}}) : [];
    },

    connect: function (playerId) {
        connectionsModel.update({}, {
            $addToSet: {
                list: {
                    playerId: playerId || this._session.id,
                    id: this._session.id
                }
            }
        }, {upsert: true});

        // set user online
        Meteor.defer(()=> {
            Meteor.call('updatePlayerStatus', playerId, true)
        });

        this._session.socket.on('close', Meteor.bindEnvironment(()=> {
            connectionsModel.update({}, {
                    $pull: {
                        list: {
                            id: this._session.id
                        }
                    }
                }
            );
            //set user offline
            Meteor.defer(()=> {
                Meteor.call('updatePlayerStatus', playerId, false);
            });
        }));

        return connectionsModel.find({});
    }
};


_.each(publications, (func, name) => {
    Meteor.publish([COMPONENT_NAME, name].join('.'), func);
});

