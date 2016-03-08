RoomView = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {
        roomId: React.PropTypes.string
    },

    getInitialState(){
        //var info = this.getRoom();

        return {
            isLoading: false,
            user: null,
            detectJoined: false,
            //boardMap: info.boardMap,
            typeMap: {
                'player01': '1',
                'player02': '-1',
                'guest': null
            }
        };
    },

    getMeteorData() {
        var subRoomInfo = Meteor.subscribe('room.info', this.props.roomId);
        var isRoomReady = (subRoomInfo && subRoomInfo.ready());

        var subPlayerInfo = Meteor.subscribe('player.currentPlayer', this.getPlayerId());
        var isPlayerReady = (subPlayerInfo && subPlayerInfo.ready());

        return {
            isRoomReady: isRoomReady,
            isPlayerReady: isPlayerReady,
            info: Meteor.room.find({}).fetch()[0],
            players: Meteor.player.find({}).fetch()
        }
    },

    style(){
        return {
            button: {
                margin: 5
            },
            infoBlock: {
                marginBottom: 50
            }
        }
    },

    getPlayerId() {
        return localStorage.getItem('playerId');
    },

    handleClick(key){
        let [x, y] = (key && typeof  key === 'string') ? key.split('_') : null;
        var playerId = this.getPlayerId();
        if (x == void 0 || y == void 0 || !playerId)
            return false;
        else {
            Meteor.call('handleClick', x, y, this.props.roomId, playerId, function (err, res) {
                if (err)
                    console.error('error', err);
                else if (!res)
                    console.log('cannot moved');
                else
                    console.log('enjoy the game');

            });

        }

    },
    renderBoard(){
        return (<Board info={this.data.info} handleClick={this.handleClick}/>);
    },

    invalidHandler(){
        localStorage.clear();
        Session.set('redirect_url', Router.current().url);
        return Router.go('home');
    },

    joinToPlay(){
        var self = this;
        var playerId = this.getPlayerId();
        if (!this.props.roomId || !playerId) {
            this.invalidHandler();
        }

        Meteor.call('joinRoom', this.props.roomId, playerId, function (err, res) {
            if (res) {
                self.setState({detectJoined: true});
            }
            else {
                self.invalidHandler();
            }

        });
    },

    resetGame(){
        //TODO : reset => confirm = lose (implement scoreboard later)
        /*Meteor.call('resetGame', this.props.roomId, this.data.player._id, function (err, reset) {
         if (err)
         console.error(err);

         console.log('reset done');
         });*/
    },

    BackToLobby() {
        Router.go('room.list');
    },

    renderPlayer(playerId, key){
        return (
            <div key={key}>
                <span> id: {playerId}</span> <br/>
            </div>
        );


    },
    renderRoomInfo(){
        var info = this.data.info;
        return (
            <div className="info-group">
                <div className="col-xs-6 text-left">
                    <label>Game status</label> : <span>{info.gameStatus}</span><br/>
                    <label>Winner</label> : <span className="text-danger">{info.winner || ''}</span>
                </div>

                <div className="col-xs-6 text-right">
                    <label>Player01</label> : <span>{info.player01}</span><br/>
                    <label>Player02</label> : <span>{info.player02}</span>
                </div>
                <br/>

                <div className="clearfix">
                    <label>Next Turn</label> : <span>{info['turn01'] ? info.player01 : info.player02}</span>
                </div>

            </div>);
    },

    renderButton(){
        var buttons = [];
        var info = this.data.info;

        if (info && this.getPlayerId() != info.player01 && !info.player02)
            buttons.push(<button key="btn_1" style={this.style().button} type="button" className="btn btn-primary"
                                 onClick={this.joinToPlay}>
                Join to play
            </button>);

        buttons.push(<button key="btn_2" style={this.style().button} type="button" className="btn btn-warning"
                             onClick={this.BackToLobby}>
            Room List
        </button>);

        return (
            <div className="button-group">
                {buttons}
            </div>
        )
    },

    render(){
        return (
            <div className="row center-block text-center">
                <div style={this.style().infoBlock}>
                    {this.renderButton()}
                    {this.data.isRoomReady && this.renderRoomInfo()}
                </div>
                {this.data.isRoomReady && this.renderBoard()}
            </div>
        )
    }
});