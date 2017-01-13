const wrapCodeBlock = require('./wrapCodeBlock');
const unwrapCodeBlock = require('./unwrapCodeBlock');
const isInCodeBlock = require('../isInCodeBlock');

/**
 * Toggle code block / paragraph.
 * @param  {Transform} transform
 * @param  {String} type
 * @return {Transform}
 */
function toggleCodeBlock(opts, transform, type) {
    if (isInCodeBlock(opts, transform.state)) {
        return unwrapCodeBlock(opts, transform, type);
    } else {
        return wrapCodeBlock(opts, transform);
    }
}

module.exports = toggleCodeBlock;
