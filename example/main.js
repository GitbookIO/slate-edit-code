// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import PluginEditCode from '../lib/';

import INITIAL_VALUE from './value';

const plugin = PluginEditCode();
const plugins = [plugin];

function renderNode(props: *) {
    const { node, children, attributes } = props;

    switch (node.type) {
        case 'code_block':
            return (
                <div className="code" {...attributes}>
                    {children}
                </div>
            );
        case 'code_line':
            return <pre {...attributes}>{children}</pre>;
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return null;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    onToggleCode = () => {
        const { value } = this.state;

        this.onChange(
            plugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus()
        );
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <button onClick={this.onToggleCode}>
                    {plugin.utils.isInCodeBlock(value)
                        ? 'Paragraph'
                        : 'Code Block'}
                </button>
                <Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                    renderNode={renderNode}
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
