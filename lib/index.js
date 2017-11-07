const { Document } = require('slate');

const onEnter = require('./onEnter');
const onModEnter = require('./onModEnter');
const onTab = require('./onTab');
const onShiftTab = require('./onShiftTab');
const onBackspace = require('./onBackspace');
const onSelectAll = require('./onSelectAll');
const makeSchema = require('./makeSchema');
const getCurrentCode = require('./getCurrentCode');
const Options = require('./options');
const deserializeCode = require('./deserializeCode');
const isInCodeBlock = require('./isInCodeBlock');

const wrapCodeBlockByKey = require('./changes/wrapCodeBlockByKey');
const unwrapCodeBlockByKey = require('./changes/unwrapCodeBlockByKey');
const wrapCodeBlock = require('./changes/wrapCodeBlock');
const unwrapCodeBlock = require('./changes/unwrapCodeBlock');
const toggleCodeBlock = require('./changes/toggleCodeBlock');

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
        const { state } = change;
        const currentCode = getCurrentCode(opts, state);

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
        const { state } = change;
        const currentCode = getCurrentCode(opts, state);

        // Only handle paste when selection is completely a code block
        const { endBlock } = state;
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

    const schema = makeSchema(opts);

    return {
        onKeyDown: _onKeyDown,
        onPaste,

        schema,

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

module.exports = EditCode;
