const detectIndent = require('detect-indent');
const DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 * @param {String} text
 * @return {String}
 */
function getIndent(text) {
    var result = detectIndent(text);
    return result.indent || DEFAULT_INDENTATION;
}

module.exports = getIndent;
