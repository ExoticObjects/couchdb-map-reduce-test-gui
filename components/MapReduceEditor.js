var React = require('react');
var Basil = require('basil.js').localStorage;
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
    componentWillMount: function () {
        if (!Basil.get(CK_MAP_CODE)){
            map_code = Defaults.MAP_CODE;
            Basil.set(CK_MAP_CODE, Defaults.MAP_CODE);
        }
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

        Basil.set(CK_MAP_CODE, val);
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

        Basil.set(CK_REDUCE_CODE, val);
    },
    render: function() {
        var options = {
            lineNumbers: true
        };
        var map_code = Basil.get(CK_MAP_CODE);
        var reduce_code = Basil.get(CK_REDUCE_CODE);
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Map Code</h2>
                    <CodeMirror id="map-code" className="map-editor" height="300" width="100%" onChange={this.onUpdateMap} value={map_code}/>
                    <div id="map-errors" className="error"></div>
                </div>
                <div className="col-md-6">
                    <h2>Reduce Code</h2>
                    <CodeMirror id="reduce-code" className="reduce-editor" height="300" width="100%" onChange={this.onUpdateReduce} value={reduce_code}/>
                    <div id="reduce-errors" className="error"></div>
                </div>
            </div>
        )
    }
});

module.exports = MapReduceEditor;
