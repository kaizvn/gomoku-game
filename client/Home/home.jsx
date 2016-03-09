//PlayerView = React.createClass({
HomeView = React.createClass({
    getInitialState(){
        var redirect = Session.get('redirect_url');
        return {
            playerId: 'anonymous' + Date.now() % 1000000,
            redirect: redirect,
            error: false,
            errorMsg: ''
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
        var self = this
            , playerId = this.state.playerId.trim();

        if (this.state.playerId == void 0 || this.state.playerId === '')
            return false;

        Meteor.call('getPlayer', playerId, function (err, res) {
            if (err) {
                console.error(err);
                self.setState({error: true});
                self.setState({errorMsg: err.message});
            } else if (res) {
                if (res.errorMsg) {
                    self.setState({error: true});
                    self.setState({errorMsg: res.errorMsg});
                } else if (res.playerId) {
                    localStorage.setItem('playerId', res.playerId);
                    self.redirectSubmit();
                }
            }
        });
    },

    handleChangeId(e){
        this.setState({playerId: e.target.value.substr(0, 15)});
    },

    cleanUp(e){
        return e.target.select();
    },

    renderError(){
        return (<div className="text-danger">{this.state.errorMsg}</div> );

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
                    {this.state.error && this.renderError()}
                    <span className="help-block">choose a name to play.</span>
                </div>
            </form>)
    }
});


