const getIndent = require('./getIndent');
const getCurrentCode = require('./getCurrentCode');

/**
 * Detect indentation in the current code block
 * @param {String} text
 * @param {String} defaultValue?
 * @return {String}
 */
function getCurrentIndent(opts, state) {
    const currentCode = getCurrentCode(opts, state);
    const text = currentCode.getTexts().map(t => t.text).join('\n');
    return getIndent(text);
}

module.exports = getCurrentIndent;
