/** @jsx hyperscript */
import { Value } from 'slate';
import hyperscript from '../hyperscript';

export default Value.fromJSON(
    {
        document: (
            <document>
                <code_block>
                    <code_line>
                        <text>One text</text>
                        <default>Unwanted text</default>
                        <text>Two text</text>
                    </code_line>
                </code_block>
            </document>
        )
    },
    { normalize: false }
);
