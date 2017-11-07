import React from 'react';
import ReactDOM from 'react-dom';
import Slate from 'slate';
import PluginEditCode from '../lib/';

import valueJson from './value';

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
            value: Slate.Value.fromJSON(valueJson)
        };
    },

    onChange({ value }) {
        this.setState({
            value
        });
    },

    onToggleCode() {
        const { value } = this.state;

        this.onChange(
            plugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus()
        );
    },

    render() {
        const { value } = this.state;

        return (
            <div>
                <button onClick={this.onToggleCode}>
                    {plugin.utils.isInCodeBlock(value)
                        ? 'Paragraph'
                        : 'Code Block'}
                </button>
                <Slate.Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                    schema={SCHEMA}
                />
            </div>
        );
    }
});

ReactDOM.render(<Example />, document.getElementById('example'));
