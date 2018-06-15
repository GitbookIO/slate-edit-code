/** @jsx h */
// @flow
// eslint-disable-next-line
import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        code_block: 'code_block',
        code_line: 'code_line'
    }
});

const value = (
    <value>
        <document>
            <heading>Slate + Code Editing</heading>
            <paragraph>
                {
                    'This page is a basic example of Slate + slate-edit-code plugin. Press Tab to indent code. Shift+Tab to unindent. Press Enter to carry indentation onto the newline. Press Mod (Cmd on Mac, Ctrl on Windows) + Enter to exit the code block.'
                }
            </paragraph>
            <code_block>
                <code_line>{'// Some JavaScript'}</code_line>
                <code_line>{'function hello() {'}</code_line>
                <code_line>{"  console.log('Hello World')"}</code_line>
                <code_line>{'}'}</code_line>
            </code_block>
            <paragraph>End paragraph</paragraph>
        </document>
    </value>
);

export default value;
