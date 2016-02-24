var React = require('react');
var PubSub = require('pubsub-js');
var Basil = require('basil.js').localStorage;
var TestDocsEditor = require('./TestDocsEditor');
var MapReduceEditor = require('./MapReduceEditor');

// keys and values emitted from last map test
var emitted_vals = [];
// keys and docs and values emitted from last map test, to be passed to reduce function
var vals_to_reduce = [];
// doc currently passed to map(). Needed to populate vals_to_reduce
var current_doc;

var MAPREDUCE_RESULT = 'MAPREDUCE_RESULT';

function emit(key, val){
    // console.log('emitted key: '+key+' => '+JSON.stringify(val));
    emitted_vals.push([key,val]);
    vals_to_reduce.push( [[key, current_doc._id], val] );
}

function _sum(keys, values, rereduce) {
    return __sum(values);
}

function _count(keys, values, rereduce) {
    if (rereduce) {
        return __sum(values);
    } else {
        return values.length;
    }
}

function __sum(values){
    var n = 0;
    for(var i = 0; i < values.length; i++) {
        n += values[i];
    }
    return n;
}

var RunButton = React.createClass({
    statics: {
        MAPREDUCE_RESULT: MAPREDUCE_RESULT
    },
    getInitialState: function() {
        return {};
    },
    onClickMapReduce: function(e, react_id, orig_e) {
        this.onClickMap(e, react_id, orig_e, true);
    },
    onClickMap: function(e, react_id, orig_e, do_reduce) {
        emitted_vals = [];
        vals_to_reduce = [];
        var docs = JSON.parse(Basil.get(TestDocsEditor.CK_TEST_DOCS));
        
        var map_error, reduce_error;
        try {
            map_error = true;
            var map_func = eval('map_code = '+ Basil.get(MapReduceEditor.CK_MAP_CODE));
            map_error = false;
            
            var reduce_func = null;
            var reduce_code = String(Basil.get(MapReduceEditor.CK_REDUCE_CODE)).trim();
            if (do_reduce && reduce_code!=null && reduce_code.length>0){
                reduce_error = true;
                reduce_func = eval('reduce = '+ reduce_code);
                reduce_error = false;
            }
            
            map_error = true;
            // map docs
            for (var i = 0; i < docs.length; i++){
                var doc = docs[i];
                current_doc = doc;
                map_func(doc);
            }

            map_error = false;
            var result = emitted_vals;
            if (reduce_func){
                reduce_error = true;
                var reduced_vals = [];
                for (var i = 0; i < vals_to_reduce.length; i++){
                    obj = vals_to_reduce[i]; 
                    reduced_vals.push( reduce_func([obj[0]], [obj[1]], false) );
                }
                result = reduce_func(null, reduced_vals, true);
            }

        } catch(e){
            var sel = reduce_error ? '#reduce-errors':'#map-errors';
            $(sel).text(e);
            return;
        }
        PubSub.publish( MAPREDUCE_RESULT, result );
    },
    render: function() {
        return <div style={{padding:'10px'}}>
            <button className="btn btn-primary" onClick={this.onClickMap}>Map</button>
            <button className="btn btn-primary btn-mapreduce" onClick={this.onClickMapReduce}>Map &amp; Reduce</button>
        </div>
    }
});

module.exports = RunButton;
