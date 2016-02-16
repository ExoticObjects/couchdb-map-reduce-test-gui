var React = require('react');

require('../node_modules/codemirror/mode/javascript/javascript.js');

if (typeof navigator !== 'undefined') {
  var CM = require('codemirror');
}

var CodeMirror = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onFocusChange: React.PropTypes.func,
    options: React.PropTypes.object,
    path: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.any,
  },
  getInitialState: function () {
    return {
      isFocused: false,
    };
  },
  componentDidMount: function () {
      var textareaNode = $('#'+this.ta_id)[0];//this.refs.textarea;
      var options = { lineNumbers: true, theme: 'neat', mode:{name: "javascript", json:this.props.json_mode||false}} || this.props.options;
      this.codeMirror = CM.fromTextArea(textareaNode, options);
      this.codeMirror.on('change', this.codemirrorValueChanged);
      this.codeMirror.on('focus', this.focusChanged.bind(this, true));
      this.codeMirror.on('blur', this.focusChanged.bind(this, false));
      this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
      this.codeMirror.setValue(this._currentCodemirrorValue);
      this.codeMirror.setSize(this.props.width, this.props.height);
  },
  componentWillUnmount: function () {
    // todo: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value);
    }
    if (typeof nextProps.options === 'object') {
      for (var optionName in nextProps.options) {
        if (nextProps.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.options[optionName]);
        }
      }
    }
  },
  getCodeMirror: function() {
    return this.codeMirror;
  },
  focus: function() {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  },
  focusChanged: function(focused) {
    this.setState({
      isFocused: focused,
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  },
  codemirrorValueChanged: function(doc, change) {
    var newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
    this.props.onChange && this.props.onChange(newValue);
  },
  render: function() {
    var editorClassName = ['ReactCodeMirror', this.state.isFocused ? 'ReactCodeMirror--focused' : '', this.props.className].join(' ');
    this.ta_id = "ta_"+String(Math.random()).replace(/\./g,'');
    return (
      <div className={editorClassName}>
        <textarea id={this.ta_id} xref="textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off" />
      </div>
    );
  },
});

module.exports = CodeMirror;
