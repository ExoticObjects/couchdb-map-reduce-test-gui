var React = require('react');
var Cookies = require('js-cookie');
var CodeMirror = require('./CodeMirror');
var Defaults = require('../defaults.js');

var CK_TEST_DOCS = 'test_docs';

var TestDocsEditor = React.createClass({
    
    statics:{ CK_TEST_DOCS: CK_TEST_DOCS },

    getInitialState: function() {
        var docs_str = Cookies.get(CK_TEST_DOCS);
        if (!docs_str){
            docs_str = Defaults.TEST_DOCS;
            Cookies.set(CK_TEST_DOCS, docs_str);
        }
        return {
            docs: docs_str
        };
    },
    onUpdate: function(val) {
        try {
            JSON.parse(val);
        } catch (e){
            $('#test-docs-errors').text(e);
            return;
        }

        $('#test-docs-errors').text('');

        Cookies.set(CK_TEST_DOCS, val);
        this.setState({
            code: val
        });
    },
    render: function() {
        var options = {
            lineNumbers: true
        };
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Test Docs</h2>
                    <i>Enter a JSON array of documents to test against.</i>
                    <div>
                        <CodeMirror id="test-docs" className="docs-editor" height="600" width="100%" json_mode={true} onChange={this.onUpdate} value={this.state.docs}/>
                        <div id="test-docs-errors" className="error"></div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = TestDocsEditor;
