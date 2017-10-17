const { Document } = require('slate');
const { getEventTransfer } = require('slate-react');

const onEnter         = require('./onEnter');
const onModEnter      = require('./onModEnter');
const onTab           = require('./onTab');
const onShiftTab      = require('./onShiftTab');
const onBackspace     = require('./onBackspace');
const onSelectAll     = require('./onSelectAll');
const makeSchema      = require('./makeSchema');
const getCurrentCode  = require('./getCurrentCode');
const Options         = require('./options');
const deserializeCode = require('./deserializeCode');
const isInCodeBlock   = require('./isInCodeBlock');

const wrapCodeBlockByKey = require('./changes/wrapCodeBlockByKey');
const unwrapCodeBlockByKey = require('./changes/unwrapCodeBlockByKey');
const wrapCodeBlock = require('./changes/wrapCodeBlock');
const unwrapCodeBlock = require('./changes/unwrapCodeBlock');
const toggleCodeBlock = require('./changes/toggleCodeBlock');

const KEY_ENTER     = 'Enter';
const KEY_TAB       = 'Tab';
const KEY_BACKSPACE = 'Backspace';

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
    function _onKeyDown(event, change) {
        const { state } = change;
        const currentCode = getCurrentCode(opts, state);

        // Inside code ?
        if (!currentCode) {
            return;
        }

        // Add opts in the argument list
        const args = [event, change, opts];

        // Select all the code in the block (Mod+a)
        if (event.key === 'a' && event.metaKey && opts.selectAll) {
            return onSelectAll(...args);
        }

        // User is pressing Shift+Tab
        else if (event.key === KEY_TAB && event.shiftKey) {
            return onShiftTab(...args);
        }

        // User is pressing Tab
        else if (event.key == KEY_TAB) {
            return onTab(...args);
        }

        // User is pressing Mod+Enter
        else if (event.key == KEY_ENTER && event.metaKey && opts.exitBlockType) {
            return onModEnter(...args);
        }

        // User is pressing Enter
        else if (event.key == KEY_ENTER) {
            return onEnter(...args);
        }

        // User is pressing Backspace
        else if (event.key == KEY_BACKSPACE) {
            return onBackspace(...args);
        }
    }

    /**
     * User is pasting content, insert it as text
     */
    function onPaste(event, change) {
        const { state } = change;
        const currentCode = getCurrentCode(opts, state);
        const EventTransfer = getEventTransfer(event);

        // Only handle paste when selection is completely a code block
        const { endBlock } = state;
        if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
            return;
        }

        // Convert to text if needed
        let text;
        if (EventTransfer.type === 'fragment') {
            text = EventTransfer.fragment.getTexts().map(t => t.text).join('\n');
        } else {
            text = EventTransfer.text;
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
            wrapCodeBlockByKey:   wrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlock:        wrapCodeBlock.bind(null, opts),
            unwrapCodeBlock:      unwrapCodeBlock.bind(null, opts),
            toggleCodeBlock:      toggleCodeBlock.bind(null, opts)
        },

        utils: {
            isInCodeBlock:   isInCodeBlock.bind(null, opts),
            deserializeCode: deserializeCode.bind(null, opts)
        }
    };
}

module.exports = EditCode;
