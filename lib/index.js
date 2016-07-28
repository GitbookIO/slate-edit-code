
const onEnter = require('./onEnter');

const KEY_ENTER = 'enter';


/**
 * User is pressing a key in the editor
 */
function onKeyDown(e, data, state) {
    if (data.key !== KEY_ENTER) onEnter(e, data, state);
}


/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @return {Object}
 */

function EditCode() {


    return {
        onKeyDown
    };
}

module.exports = EditCode;
