const { List } = require('immutable');
const detectNewline = require('detect-newline');

const DEFAULT_NEWLINE = '\n';

/**
 * Return a list of line in this text
 * @param {String} text
 * @param {String} sep?
 * @return {List<String>}
 */
function getLines(text, sep) {
    sep = sep || detectNewline(text) || DEFAULT_NEWLINE;
    return List(text.split(sep));
}

module.exports = getLines;
