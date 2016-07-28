const detectNewline = require('detect-newline');
const DEFAULT = '\n';

/**
 * Detect the dominant newline character of a string
 * @param {String} text
 * @return {String}
 */
function getNewLine(text) {
    return detectNewline(text) || DEFAULT;
}

module.exports = getNewLine;
