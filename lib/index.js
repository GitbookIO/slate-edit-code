const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onShiftTab  = require('./onShiftTab');
const onBackspace = require('./onBackspace');
const onSelectAll = require('./onSelectAll');
const makeSchema  = require('./makeSchema');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';

/**
 * Default filter for code blocks
 * @param {Node} node
 * @return {Boolean}
 */
function defaultOnlyIn(node) {
    return node.type === 'code_block';
}

/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @param {Function} [opts.onlyIn] Filter for code blocks
 * @return {Object}
 */

function EditCode(opts = {}) {
    opts.selectAll = opts.selectAll !== false ? true : false;
    opts.onlyIn = opts.onlyIn || defaultOnlyIn;

    /**
     * User is pressing a key in the editor
     */
    function _onKeyDown(e, data, state) {
        const { startBlock } = state;

        if (!opts.onlyIn(startBlock)) {
            return;
        }

        // Select all the code in the block
        if (opts.selectAll && data.key === 'a' && data.isMod) {
            return onSelectAll(e, data, state);
        }

        // User is pressing Shift+Tab
        else if (data.key == KEY_TAB && data.isShift) {
            return onShiftTab(e, data, state);
        }

        // User is pressing Tab
        else if (data.key == KEY_TAB) {
            return onTab(e, data, state);
        }

        // User is pressing Enter
        else if (data.key == KEY_ENTER) {
            return onEnter(e, data, state);
        }

        // User is pressing Backspace
        else if (data.key == KEY_BACKSPACE) {
            return onBackspace(e, data, state);
        }
    }

    /**
     * User is pasting content, insert it as text
     */
    function onPaste(event, data, state) {
        const { startBlock, endBlock } = state;

        // Only paste when selection is completly in the code block
        if (startBlock.key !== endBlock.key) {
            return;
        }

        // Only accept text/html
        if ((data.type !== 'text')
        && (data.type !== 'html')) {
            return;
        }

        // Is it a code block
        if (!opts.onlyIn(startBlock)) {
            return;
        }

        return state.transform()
            .insertText(data.text)
            .apply();
    }

    const schema = makeSchema({
        onlyIn: opts.onlyIn
    });

    return {
        onKeyDown: _onKeyDown,
        onPaste,

        schema
    };
}

module.exports = EditCode;
