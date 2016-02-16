var React = require('react');
var Cookies = require('js-cookie');
var CodeMirror = require('./CodeMirror');
var Defaults = require('../defaults.js');

var CK_MAP_CODE = 'map_code';
var CK_REDUCE_CODE = 'reduce_code';

var _count, _sum;

var MapReduceEditor = React.createClass({
    
    statics: {
       CK_MAP_CODE: CK_MAP_CODE,
       CK_REDUCE_CODE: CK_REDUCE_CODE
    },

    getInitialState: function() {
        map_code = Cookies.get(CK_MAP_CODE);
        reduce_code = Cookies.get(CK_REDUCE_CODE) || '';
        if (!map_code){
            map_code = Defaults.MAP_CODE;
            Cookies.set(CK_MAP_CODE, map_code);
        }
        return {
            map_code: map_code,
            reduce_code: reduce_code
        };
    },
    onUpdateMap: function(val) {
        try {
            eval('map_code = '+ val);
        } catch (e){
            $('#map-errors').text(e);
            return;
        }

        var err = '';
        if (val.indexOf('new Date()')>-1 ){
            err = "Don't use new Date() in map.";
        }
        $('#map-errors').text(err);

        Cookies.set(CK_MAP_CODE, val);
        this.setState({
            map_code: val
        });
    },
    onUpdateReduce: function(val) {
        try {
            if (val && val.length)
                eval('reduce_code = '+ val);
        } catch (e){
            $('#reduce-errors').text(e);
            return;
        }

        $('#reduce-errors').text('');

        Cookies.set(CK_REDUCE_CODE, val);
        this.setState({
            reduce_code: val
        });
    },
    render: function() {
        var options = {
            lineNumbers: true
        };
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Map Code</h2>
                    <CodeMirror id="map-code" className="map-editor" height="300" width="100%" onChange={this.onUpdateMap} value={this.state.map_code}/>
                    <div id="map-errors" className="error"></div>
                </div>
                <div className="col-md-6">
                    <h2>Reduce Code</h2>
                    <CodeMirror id="reduce-code" className="reduce-editor" height="300" width="100%" onChange={this.onUpdateReduce} value={this.state.reduce_code}/>
                    <div id="reduce-errors" className="error"></div>
                </div>
            </div>
        )
    }
});

module.exports = MapReduceEditor;
