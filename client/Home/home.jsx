//PlayerView = React.createClass({
HomeView = React.createClass({
    getInitialState(){
        var redirect = Session.get('redirect_url');
        return {
            playerId: 'anonymous' + Date.now() % 1000000,
            redirect: redirect
        }
    },

    style(){
        return {
            formStyle: {
                maxWidth: 330,
                padding: 15,
                margin: '0 auto',
                textAlign: 'center'
            }
        }
    },

    redirectSubmit(){
        Router.go(this.state.redirect || 'room.list');
    },

    handleSubmit(e){
        e.preventDefault();
        var self = this;
        var playerId = this.state.playerId;

        if (!this.state.playerId)
            return false;

        Meteor.call('getPlayer', playerId, function (err, player) {
            localStorage.setItem('playerId', player.playerId);

            self.redirectSubmit();
        });
    },

    handleChangeId(e){
        this.setState({playerId: e.target.value.substr(0, 15)});
    },
    cleanUp(e){
        return e.target.select();
    },

    render(){
        return (
            <form onSubmit={this.handleSubmit} style={this.style().formStyle}>
                <div className="form-group">
                    <label className="">
                        Player Name
                    </label>
                    <input type="text" onFocus={this.cleanUp} onChange={this.handleChangeId} value={this.state.playerId}
                           className="form-control col-md-3 text-center"
                           aria-describedby="helpBlock"/>
                    <span className="help-block">choose a name to play.</span>
                </div>
            </form>)
    }
});


