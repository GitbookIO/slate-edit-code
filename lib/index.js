const onEnter         = require('./onEnter');
const onTab           = require('./onTab');
const onShiftTab      = require('./onShiftTab');
const onBackspace     = require('./onBackspace');
const onSelectAll     = require('./onSelectAll');
const makeSchema      = require('./makeSchema');
const getCurrentCode  = require('./getCurrentCode');
const Options         = require('./options');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
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
    function _onKeyDown(e, data, state) {
        const currentCode = getCurrentCode(opts, state);

        // Inside code ?
        if (!currentCode) {
            return;
        }

        // Add opts in the argument list
        const args = [e, data, state, opts];

        // Select all the code in the block (Mod+a)
        if (data.key === 'a' && data.isMod && opts.selectAll) {
            return onSelectAll(...args);
        }

        // User is pressing Shift+Tab
        else if (data.key === KEY_TAB && data.isShift) {
            return onShiftTab(...args);
        }

        // User is pressing Tab
        else if (data.key == KEY_TAB) {
            return onTab(...args);
        }

        // User is pressing Enter
        else if (data.key == KEY_ENTER && opts.shiftEnterExit) {
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
        if (startBlock.type !== opts.containerType) {
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
