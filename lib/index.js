const onEnter         = require('./onEnter');
const onTab           = require('./onTab');
const onShiftTab      = require('./onShiftTab');
const onBackspace     = require('./onBackspace');
const onSelectAll     = require('./onSelectAll');
const makeSchema      = require('./makeSchema');
const getCurrentCode  = require('./getCurrentCode');

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
    opts.lineType = opts.lineType || 'code_line';

    /**
     * User is pressing a key in the editor
     */
    function _onKeyDown(e, data, state) {
        const currentCode = getCurrentCode(opts, state);

        // Inside code ?
        if (!currentCode) {
            return;
        }

        // Add opts in the argument list
        const args = [e, data, state, opts];

        // Select all the code in the block (Mod+a)
        if (opts.selectAll && data.key === 'a' && data.isMod) {
            return onSelectAll(...args);
        }

        // User is pressing Shift+Tab
        else if (data.key == KEY_TAB && data.isShift) {
            return onShiftTab(...args);
        }

        // User is pressing Tab
        else if (data.key == KEY_TAB) {
            return onTab(...args);
        }

        // User is pressing Enter
        else if (data.key == KEY_ENTER) {
            return onEnter(...args);
        }

        // User is pressing Backspace
        else if (data.key == KEY_BACKSPACE) {
            return onBackspace(...args);
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

    const schema = makeSchema(opts);

    return {
        onKeyDown: _onKeyDown,
        onPaste,

        schema
    };
}

module.exports = EditCode;
