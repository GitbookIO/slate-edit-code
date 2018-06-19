/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <code_block>
                <code_line>Hello</code_line>
                <paragraph>invalid</paragraph>
                <code_line>World</code_line>
                <paragraph>{'invalid\n again'}</paragraph>
            </code_block>
        </document>
    </value>
);
