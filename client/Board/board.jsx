Board = React.createClass({
    propTypes: {
        info: React.PropTypes.object,
        test: React.PropTypes.string
    },

    getInitialState() {
        return {
            isLoading: false,
            //boardMap: info.boardMap,
            width: 15,
            height: 15,
            user: null,
            typeMap: {
                'player01': '1',
                'player02': '-1',
                'guest': null
            }
        };
    },

    BoardStyle(){
        var square = {
            width: 16,
            height: 16,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderTopStyle: 'solid',
            borderRightStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftStyle: 'solid'
        };
        var squareEnd = {
            width: 1,
            height: 16
        };
        var boards = {
            lineHeight: 0
        };

        return {
            boards: boards,
            square: square,
            squareEnd: squareEnd
        }
    },

    componentWillMount(){
    },

    renderUrl(val){
        val = val || 0;
        return "/img/s" + val + ".gif";

    },

    handleClick(key, e){
        e.stopPropagation();
        e.preventDefault();
        this.props.handleClick(key);
    },

    renderSquare(x, y){
        var key = x + '_' + y;
        var val = this.props.info.boardMap[x][y];
        return (<a key={key} href="#" onClick={ this.handleClick.bind(this,key)}>
            <img name={key} style={this.BoardStyle().square}
                 src={this.renderUrl(val)}
                 width="16" height="16"
                 border="0"/>
        </a>);
    },


    renderBoard(){
        if (!this.props.info || !this.props.info.boardMap)
            return '';

        let squares = []
            , height = this.props.info.boardMap.length
            , width = this.props.info.boardMap[0].length;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                squares.push(this.renderSquare(i, j));
            }

            squares.push(
                <a href="#" key={i + '_' + width}>
                    <img style={this.BoardStyle().squareEnd} src="/img/g.gif"
                         height="16"/>
                </a>);
            squares.push(<br key={i}/>);
        }
        squares.push(<img key={ width + '_'+ height } style={{width : (width * 16), height: 1}}
                          src="/img/g.gif"/>);

        return squares;
    },

    render(){
        return (<div className="">
            <div className="render-board" style={this.BoardStyle().boards}>
                {this.renderBoard()}
            </div>
        </div>)
    }
});