const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditCode = require('../lib/');

const stateJson = require('./state');

const plugins = [
    PluginEditCode()
];

const SCHEMA = {
    nodes: {
        code_block: props => <div className="code" {...props.attributes}>{props.children}</div>,
        code_line:  props => <pre {...props.attributes}>{props.children}</pre>,
        paragraph:  props => <p {...props.attributes}>{props.children}</p>,
        heading:    props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

const Example = React.createClass({
    getInitialState() {
        return {
            state: Slate.Raw.deserialize(stateJson, { terse: true })
        };
    },

    onChange(state) {
        this.setState({
            state
        });
    },

    render() {
        return (
            <Slate.Editor
                placeholder={'Enter some text...'}
                plugins={plugins}
                state={this.state.state}
                onChange={this.onChange}
                schema={SCHEMA}
            />
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
