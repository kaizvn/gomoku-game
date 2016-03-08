//HomeView = React.createClass({
ListView = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState(){
        return {
            player: null
        };
    },

    getMeteorData(){
        var sub = Meteor.subscribe('room.list');
        var isReady = (sub && sub.ready());
        return {
            isReady: isReady,
            roomList: Meteor.room.find({}).fetch(),
            connections: connectionsModel.find().fetch()[0]
        }
    },

    componentWillMount(){

    },

    getDefaultImages(){
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzNTI5NTg2NzYgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM1Mjk1ODY3NiI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+';
    },

    invalidHandler(){
        localStorage.clear();
        Session.set('redirect_url', Router.current().url);
        return Router.go('home');
    },

    createNewGame(e){
        e.preventDefault();
        e.stopPropagation();

        var playerId = localStorage.getItem('playerId');
        if (!playerId) {
            this.invalidHandler();
        }

        Meteor.call('createNewRoom', playerId, function (err, _id) {
            if (_id)
                Router.go('room.id', {id: _id});
        });
    },

    buildUrl(roomId){
        return (roomId) ? '/room/' + roomId : '';
    },

    renderRoom(info, key) {
        return (
            <div className="col-sm-6 col-md-4" key={key}>
                <a href={this.buildUrl(info._id)} className="thumbnail">
                    <div className="caption">
                        <h4>game status : {info.gameStatus}</h4>
                        <label>Player01</label> : <span>{info.player01}  </span>
                        {info.winner === 'player01' ? <span className="glyphicon glyphicon-ok"></span> : ''}
                        <br/>
                        <label>Player02</label> : <span>{info.player02}  </span>
                        {info.winner === 'player02' ? <span className="glyphicon glyphicon-ok"></span> : ''}
                    </div>
                </a>
            </div>)
    },

    renderLobbyInfo() {
        var conn = 0;
        if (this.data.connections)
            conn = _.unique(_.pluck(this.data.connections.list, 'playerId')).length;

        return (
            <div style={{paddingBottom: 20 }}>
                <div className="lobby-info">
                    <div className="pull-left">
                        <button className="btn btn-primary" onClick={this.createNewGame}>
                            create new game
                        </button>
                    </div>
                    <div className="pull-right text-right">
                        <span>Online players: {conn}</span>
                        <br/>
                        <span>Your name: <b>{localStorage.getItem('playerId')}</b></span>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    },

    render(){
        return (
            <div className="row col-md-12">
                {this.renderLobbyInfo()}
                <div className="lobby-list">
                    {this.data.roomList.map(this.renderRoom)}
                </div>

            </div>)

    }
});


