const detectIndent = require('detect-indent');
const DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 * @param {String} text
 * @param {String} defaultValue?
 * @return {String}
 */
function getIndent(text, defaultValue = DEFAULT_INDENTATION) {
    return detectIndent(text).indent || defaultValue;
}

module.exports = getIndent;
