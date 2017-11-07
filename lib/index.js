import { Document } from 'slate';

import onEnter from './onEnter';
import onModEnter from './onModEnter';
import onTab from './onTab';
import onShiftTab from './onShiftTab';
import onBackspace from './onBackspace';
import onSelectAll from './onSelectAll';
import getCurrentCode from './getCurrentCode';
import Options from './options';
import deserializeCode from './deserializeCode';
import isInCodeBlock from './isInCodeBlock';

import wrapCodeBlockByKey from './changes/wrapCodeBlockByKey';
import unwrapCodeBlockByKey from './changes/unwrapCodeBlockByKey';
import wrapCodeBlock from './changes/wrapCodeBlock';
import unwrapCodeBlock from './changes/unwrapCodeBlock';
import toggleCodeBlock from './changes/toggleCodeBlock';

import { schema, validateNode } from './validation';

const KEY_ENTER = 'enter';
const KEY_TAB = 'tab';
const KEY_BACKSPACE = 'backspace';

/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @param {Options | Object} opts
 * @return {Object}
 */

function EditCode(opts) {
    opts = new Options(opts);

    /**
     * User is pressing a key in the editor
     */
    function _onKeyDown(e, data, change) {
        const { value } = change;
        const currentCode = getCurrentCode(opts, value);

        // Inside code ?
        if (!currentCode) {
            return;
        }

        // Add opts in the argument list
        const args = [e, data, change, opts];

        // Select all the code in the block (Mod+a)
        if (data.key === 'a' && data.isMod && opts.selectAll) {
            return onSelectAll(...args);
        } else if (data.key === KEY_TAB && data.isShift) {
            // User is pressing Shift+Tab
            return onShiftTab(...args);
        } else if (data.key == KEY_TAB) {
            // User is pressing Tab
            return onTab(...args);
        } else if (data.key == KEY_ENTER && data.isMod && opts.exitBlockType) {
            // User is pressing Shift+Enter
            return onModEnter(...args);
        } else if (data.key == KEY_ENTER) {
            // User is pressing Enter
            return onEnter(...args);
        } else if (data.key == KEY_BACKSPACE) {
            // User is pressing Backspace
            return onBackspace(...args);
        }
    }

    /**
     * User is pasting content, insert it as text
     */
    function onPaste(event, data, change) {
        const { value } = change;
        const currentCode = getCurrentCode(opts, value);

        // Only handle paste when selection is completely a code block
        const { endBlock } = value;
        if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
            return;
        }

        // Convert to text if needed
        let text;
        if (data.type === 'fragment') {
            text = data.fragment
                .getTexts()
                .map(t => t.text)
                .join('\n');
        } else {
            text = data.text;
        }

        // Convert the text to code lines
        const lines = deserializeCode(opts, text).nodes;

        const fragment = Document.create({ nodes: lines });

        return change.insertFragment(fragment);
    }

    return {
        onKeyDown: _onKeyDown,
        onPaste,

        schema: schema(opts),
        validateNode: validateNode(opts),

        changes: {
            unwrapCodeBlockByKey: unwrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlockByKey: wrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlock: wrapCodeBlock.bind(null, opts),
            unwrapCodeBlock: unwrapCodeBlock.bind(null, opts),
            toggleCodeBlock: toggleCodeBlock.bind(null, opts)
        },

        utils: {
            isInCodeBlock: isInCodeBlock.bind(null, opts),
            deserializeCode: deserializeCode.bind(null, opts)
        }
    };
}

export default EditCode;
