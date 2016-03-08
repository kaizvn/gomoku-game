/**
 * Created by HungNguyen on 3/6/16.
 */
/*

 Router.route('/player', {
 name: 'player',
 action: function () {
 this.render('player');
 }
 });
 */


function currentPlayer() {
    return localStorage.getItem('playerId');
}


Router.route('/', {
    name: 'home',
    action() {
        if (currentPlayer())
            Router.go('room.list');
        else
            this.render('home');
    }
});


Router.route('/room', {
        name: 'room.list',
        action(){
            this.render('list');
        }
    }
);

Router.route('/room/:id', {
    name: 'room.id',
    action(){
        var roomId = this.params.id;

        Session.set('roomId', roomId);

        this.render('room', {
            data: {
                roomId: roomId
            }
        })
    }
});