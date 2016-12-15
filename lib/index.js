const { Block, Document } = require('slate');
const onEnter         = require('./onEnter');
const onShiftEnter    = require('./onShiftEnter');
const onTab           = require('./onTab');
const onShiftTab      = require('./onShiftTab');
const onBackspace     = require('./onBackspace');
const onSelectAll     = require('./onSelectAll');
const makeSchema      = require('./makeSchema');
const getCurrentCode  = require('./getCurrentCode');
const getLines        = require('./getLines');
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

        // User is pressing Shift+Enter
        else if (data.key == KEY_ENTER && data.isShift && opts.shiftEnterBlockType) {
            return onShiftEnter(...args);
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
        const currentCode = getCurrentCode(opts, state);

        // Only handle paste when selection is completely a code block
        const { endBlock } = state;
        if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
            return;
        }

        // Convert to text if needed
        let text;
        if (data.type === 'fragment') {
            text = data.fragment.getTexts().map(t => t.text).join('\n');
        } else {
            text = data.text;
        }

        // Convert the text to lines
        const lines = getLines(text).map(line => Block.create({
            type: opts.lineType,
            nodes: [ Text.createFromString(line) ]
        }));

        const fragment = Document.create({ nodes: lines });

        return state.transform()
            .insertFragment(fragment)
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
