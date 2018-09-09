/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <code_block>
                <code_line>Line 1</code_line>
                <code_line>
                    {'    '}
                    Li
                    <cursor />
                    ne 2
                </code_line>
            </code_block>
        </document>
    </value>
);
