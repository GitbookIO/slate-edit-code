import getCurrentCode from '../getCurrentCode';
import unwrapCodeBlockByKey from './unwrapCodeBlockByKey';

/**
 * Convert a code block to a normal block.
 * @param  {Change} change
 * @param  {String} type
 * @return {Change}
 */
function unwrapCodeBlock(opts, change, type) {
    const { value } = change;

    const codeBlock = getCurrentCode(opts, value);

    if (!codeBlock) {
        return change;
    }

    // Convert to paragraph
    unwrapCodeBlockByKey(opts, change, codeBlock.key, type);

    return change;
}

export default unwrapCodeBlock;
