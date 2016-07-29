const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');

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
 * @return {Object}
 */

function EditCode(opts) {
    opts = opts || {};
    opts.onlyIn = opts.onlyIn || defaultOnlyIn;

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        if (!opts.onlyIn(startBlock)) {
            return;
        }

        switch (data.key) {
        case KEY_ENTER:
            return onEnter(e, data, state);
        case KEY_TAB:
            return onTab(e, data, state);
        case KEY_BACKSPACE:
            return  onBackspace(e, data, state);
        }
    }

    return {
        onKeyDown
    };
}

module.exports = EditCode;
