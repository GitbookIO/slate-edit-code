const wrapCodeBlock = require('./wrapCodeBlock');
const unwrapCodeBlock = require('./unwrapCodeBlock');
const isInCodeBlock = require('../isInCodeBlock');

/**
 * Toggle code block / paragraph.
 * @param  {Change} change
 * @param  {String} type
 * @return {Change}
 */
function toggleCodeBlock(opts, change, type) {
    if (isInCodeBlock(opts, change.state)) {
        return unwrapCodeBlock(opts, change, type);
    } else {
        return wrapCodeBlock(opts, change);
    }
}

module.exports = toggleCodeBlock;
