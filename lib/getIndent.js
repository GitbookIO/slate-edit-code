const detectIndent = require('detect-indent');
const DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 * @param {String} text
 * @param {String} defaultValue?
 * @return {String}
 */
function getIndent(text, defaultValue) {
    var result = detectIndent(text);
    if (typeof defaultValue === 'undefined') {
        defaultValue = DEFAULT_INDENTATION;
    }

    return result.indent || defaultValue;
}

module.exports = getIndent;
