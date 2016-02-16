var React = require('react');
var Basil = require('basil.js').localStorage;
var CodeMirror = require('./CodeMirror');
var Defaults = require('../defaults.js');

var CK_TEST_DOCS = 'test_docs';

var TestDocsEditor = React.createClass({
    
    statics:{ CK_TEST_DOCS: CK_TEST_DOCS },

    componentWillMount: function () {
        if (!Basil.get(CK_TEST_DOCS)){
            Basil.set(CK_TEST_DOCS, Defaults.TEST_DOCS);
        }
    },
    onUpdate: function(val) {
        try {
            JSON.parse(val);
        } catch (e){
            $('#test-docs-errors').text(e);
            return;
        }

        $('#test-docs-errors').text('');

        Basil.set(CK_TEST_DOCS, val);
    },
    render: function() {
        var options = {
            lineNumbers: true
        };
        var code = Basil.get(CK_TEST_DOCS);
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Test Docs</h2>
                    <i>Enter a JSON array of documents to test against.</i>
                    <div>
                        <CodeMirror id="test-docs" className="docs-editor" height="600" width="100%" json_mode={true} onChange={this.onUpdate} value={code}/>
                        <div id="test-docs-errors" className="error"></div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = TestDocsEditor;
