const Immutable = require('immutable');
const getNewLine = require('./getNewLine');

/**
 * Return a list of line in this text
 * @param {String} text
 * @param {String} sep?
 * @return {List<String>}
 */
function getLines(text, sep) {
    return Immutable.List(
        text.split(sep || getNewLine(text))
    );
}

module.exports = getLines;
