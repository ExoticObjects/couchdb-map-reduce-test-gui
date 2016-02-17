var React = require('react');
var ReactDOM = require('react-dom');
var PubSub = require('pubsub-js');
var TestDocsEditor = require('./components/TestDocsEditor');
var MapReduceEditor = require('./components/MapReduceEditor');
var EmittedView = require('./components/EmittedView');
var RunButton = require('./components/RunButton');
require("./main.css");
require("./node_modules/codemirror/lib/codemirror.css");
require("./node_modules/codemirror/theme/neat.css");

var TabsView = React.createClass({
    onClickDocsTab: function(){
        // hack to get hidden CodeMirror editor to redraw
        $('.docs-editor .CodeMirror')[0].CodeMirror.refresh();
    },
    render: function(){
        return (
            <div>
              <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#mapreduce-content" aria-controls="mapreduce-content" role="tab" data-toggle="tab">Map/Reduce</a></li>
                  <li role="presentation"><a href="#test-docs-content" aria-controls="test-docs-content" role="tab" data-toggle="tab" onClick={this.onClickDocsTab}>Test Docs</a></li>
              </ul>

              <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="mapreduce-content">
                    <MapReduceEditor/>
                  </div>
                  <div role="tabpanel" className="tab-pane" id="test-docs-content">
                    <TestDocsEditor/>
                  </div>
              </div>

            </div>
        )
    }
});

ReactDOM.render(
    <div className="col-md-12">
        <h1>Map/Reduce CouchDB Tester</h1>
        <div className="row">
            <TabsView/>
            <div className="col-md-15">
                <RunButton/>
            </div>
        </div>
        <div className="row">
            <div id="docs" className="col-md-12">
                <EmittedView/>
            </div>
        </div>
    </div>
    , document.getElementById('app'))