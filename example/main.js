import React from 'react';
import ReactDOM from 'react-dom';
import Slate from 'slate';
import PluginEditCode from '../lib/';

import stateJson from './state';

const plugin = PluginEditCode();
const plugins = [plugin];

const SCHEMA = {
    nodes: {
        code_block: props => (
            <div className="code" {...props.attributes}>
                {props.children}
            </div>
        ),
        code_line: props => <pre {...props.attributes}>{props.children}</pre>,
        paragraph: props => <p {...props.attributes}>{props.children}</p>,
        heading: props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

const Example = React.createClass({
    getInitialState() {
        return {
            state: Slate.State.fromJSON(stateJson)
        };
    },

    onChange({ state }) {
        this.setState({
            state
        });
    },

    onToggleCode() {
        const { state } = this.state;

        this.onChange(
            plugin.changes.toggleCodeBlock(state.change(), 'paragraph').focus()
        );
    },

    render() {
        const { state } = this.state;

        return (
            <div>
                <button onClick={this.onToggleCode}>
                    {plugin.utils.isInCodeBlock(state)
                        ? 'Paragraph'
                        : 'Code Block'}
                </button>
                <Slate.Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    state={state}
                    onChange={this.onChange}
                    schema={SCHEMA}
                />
            </div>
        );
    }
});

ReactDOM.render(<Example />, document.getElementById('example'));
