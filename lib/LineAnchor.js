const Immutable = require('immutable');
const getNewLine = require('./getNewLine');

/**
 * Default properties.
 */

const DEFAULTS = {
    // Index of the current line
    line:   Number(0),

    // Offset in current line
    offset: Number(0)
};


class LineAnchor extends new Immutable.Record(DEFAULTS) {

    /**
     * Return an anchor of a cursor in a block as a {line,offset} object
     *
     * @param {String} text
     * @param {Number} offset
     * @param {String} sep?
     * @return {LineAnchor}
     */
    static getForOffset(text, offset, sep) {
        sep = sep || getNewLine(text);

        let lineIndex = 0;
        let nextLineIndex = 0;
        let lastLineIndex = 0;

        while (nextLineIndex >= 0 && nextLineIndex < offset) {
            lineIndex++;

            lastLineIndex = nextLineIndex;
            nextLineIndex = text.indexOf(sep, nextLineIndex + sep.length);
        }

        return new LineAnchor({
            line:   (lineIndex - 1),
            offset: (offset - lastLineIndex)
        });
    }
}

module.exports = LineAnchor;
