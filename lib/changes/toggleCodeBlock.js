import wrapCodeBlock from './wrapCodeBlock';
import unwrapCodeBlock from './unwrapCodeBlock';
import isInCodeBlock from '../isInCodeBlock';

/**
 * Toggle code block / paragraph.
 * @param  {Change} change
 * @param  {String} type
 * @return {Change}
 */
function toggleCodeBlock(opts, change, type) {
    if (isInCodeBlock(opts, change.value)) {
        return unwrapCodeBlock(opts, change, type);
    }
    return wrapCodeBlock(opts, change);
}

export default toggleCodeBlock;
