/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <code_block>
                <code_line>
                    <anchor />
                    Line 1
                </code_line>
                <code_line>
                    Line 2<focus />
                </code_line>
                <code_line>Line 3</code_line>
            </code_block>
        </document>
    </value>
);
