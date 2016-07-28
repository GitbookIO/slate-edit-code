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
    return result.indent || defaultValue || DEFAULT_INDENTATION;
}

module.exports = getIndent;
