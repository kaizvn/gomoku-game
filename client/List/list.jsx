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


