var React = require('react');
var PubSub = require('pubsub-js');
var ObjectInspector = require('react-object-inspector');
var RunButton = require('./RunButton');

var DocsEmittedView = React.createClass({

    getInitialState: function() {
        return {result: []};
    },
    onResult: function(msg, result){
        this.setState({
            result: result
        });
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
        var title;
        if (result && result.push){
            title = result.length + ' Emitted';
            var i=-1;
            result.forEach(function(key_doc) {
                i++;
                var key = key_doc[0];
                var doc = key_doc[1];
                rows.push(
                    <tr className="emitted-doc" key={i}>
                        <td><b>{JSON.stringify(key)}</b></td>
                        <td>
                            <ObjectInspector  data={doc} initialExpandedPaths={['root','root.*','root.*.*']}/>
                        </td>
                    </tr>
                );
            });
        } else {
            title = 'Reduce Result';
            rows.push(
                <tr className="emitted-doc" key="1">
                    <td>
                        <ObjectInspector  data={result} initialExpandedPaths={['root','root.*','root.*.*']}/>
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
