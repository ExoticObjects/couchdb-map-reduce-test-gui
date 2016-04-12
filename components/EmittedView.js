var React = require('react');
var PubSub = require('pubsub-js');
var ObjectInspector = require('react-object-inspector');
var RunButton = require('./RunButton');

var DocsEmittedView = React.createClass({

    getInitialState: function() {
        return {result: []};
    },
    onResult: function(msg, o){
        this.setState(o);
    },
    componentDidMount: function() {
        this.sub_token = PubSub.subscribe(RunButton.MAPREDUCE_RESULT, this.onResult );
    },
    componentWillUnmount: function() {
        PubSub.unsubscribe(this.sub_token);
    },
    render: function() {
        var rows = [];
        var result = this.state.result;
        var isReduced = this.state.isReduced;
        var title;

        if (result && !isReduced){
            title = result.length + ' Emitted';
            var i=-1;
            result.forEach(function(key_doc) {
                i++;
                var key = key_doc[0];
                var doc = key_doc[1];
                var key_str;
                if (key){
                    key_str = JSON.stringify(key);
                } else {
                    key_str = <i>no key</i>;
                }
                rows.push(
                    <tr className="emitted-doc" key={i}>
                        <td><b>{key_str}</b></td>
                        <td>
                            <ObjectInspector data={doc} initialExpandedPaths={['root']}/>
                        </td>
                    </tr>
                );
            });
        } else {
            title = 'Reduce Result';
            rows.push(
                <tr className="emitted-doc" key="1">
                    <td>
                        <ObjectInspector data={result} initialExpandedPaths={['root']}/>
                    </td>
                </tr>
            );
        }
        return (
            <div>
                <h2>{title}</h2>
                <table className="table table-striped">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = DocsEmittedView;
