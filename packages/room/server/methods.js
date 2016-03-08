/**
 * Created by HungNguyen on 8/21/15.
 */

var HEIGHT = 15,
    WIDTH = 15; // default size map

var TYPE_MAP = {
    'player01': '1',
    'player02': '-1',
    'guest': null
};


function detectWin(x, y, boardMap, type) {
    var hasWinner = false
        , done = false
        , valTable = [1, 1, 1, 1];

    var mapTable = [
        [-1, 0], //up
        [-1, 1], //up right
        [0, 1], //right
        [1, 1], // right down
        [1, 0], // down
        [1, 1],// down left
        [0, -1], // left
        [-1, -1] // left up
    ];

    while (!hasWinner && !done) {
        mapTable.forEach(function (val, index) {
            var [a,b] = val
                , pos = index % 4; // position

            while (boardMap[x + a]
            && boardMap[x + a][y + b]
            && +boardMap[x + a][y + b] == +type) {
                valTable[pos]++;
                a += val[0];
                b += val[1];
            }
        });

        if (_.filter(valTable, (val)=> {
                return val >= 5;
            }).length)
            hasWinner = true;
        else
            done = true;
    }


    return hasWinner;
}


var methods = {
    resetGame: function (playerId) {
        //TODO : resetGame with update Scoreboard
    },
    createNewRoom: function (playerId) {
        var room = new Room()
            , defaultBoard = new Array(HEIGHT);

        for (let i = 0; i < HEIGHT; i++) {
            defaultBoard[i] = [];
            for (let j = 0; j < WIDTH; j++)
                defaultBoard[i].push(0);
        }

        room.boardMap = defaultBoard;

        room.save();

        Meteor.call('joinRoom', room._id, playerId);

        return room._id;
    },
    joinRoom: function (roomId, playerId) {
        var position = null
            , room = Meteor.room.findOne({_id: roomId})
            , player = Meteor.player.findOne({playerId: playerId});

        if (!room || !player)
            return false;

        switch (player.playerId) {
            case room.player01:
            case room.player02:
                break;
            default:
                if (!room.player01)
                    position = 'player01';
                else if (!room.player02 && room.player01 != player.playerId)
                    position = 'player02';
                else
                    console.log('room ready');
                break;
        }

        if (position) {
            room[position] = player.playerId;

            if (position === 'player02')
                room.gameStatus = 'Playing';

            player.info[roomId] = {
                room: roomId,
                position: position
            };
            room.save();
            player.save();
        }

        return true;
    }
    ,
    handleClick: function (x, y, roomId, playerId) {
        x = +x;
        y = +y;

        var type = null
            , room = Meteor.room.findOne({_id: roomId})
            , currentPlayer = Meteor.player.findOne({playerId: playerId});

        if (!currentPlayer.info[roomId] || !room || room.gameStatus == 'Finished' || !room.player02) return false;

        var currentInfo = currentPlayer.info[room._id];

        (currentInfo && currentInfo.room) && (type = currentInfo.position);
        var isPlayer01 = (type === 'player01');

        if (!room.boardMap[x][y] && type !== '') {
            if (isPlayer01 === room.turn01) {
                room.boardMap[x][y] = TYPE_MAP[type];

                var isHasWinner = detectWin(x, y, room.boardMap, TYPE_MAP[type]);

                var modifier = {
                    boardMap: room.boardMap,
                    turn01: !(room.turn01),
                    winner: isHasWinner ? type : ''
                };

                if (isHasWinner) {
                    modifier.winner = type;
                    modifier.gameStatus = 'Finished';
                }

                Collection.update({_id: room._id}, {
                    $set: modifier
                });

                return true;
            }


        }
        return false;
    }

};


Meteor.methods(methods);
