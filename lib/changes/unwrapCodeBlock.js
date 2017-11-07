import getCurrentCode from '../getCurrentCode';
import unwrapCodeBlockByKey from './unwrapCodeBlockByKey';

/**
 * Convert a code block to a normal block.
 * @param  {Change} change
 * @param  {String} type
 * @return {Change}
 */
function unwrapCodeBlock(opts, change, type) {
    const { state } = change;

    const codeBlock = getCurrentCode(opts, state);

    if (!codeBlock) {
        return change;
    }

    // Convert to paragraph
    change = unwrapCodeBlockByKey(opts, change, codeBlock.key, type);

    return change;
}

export default unwrapCodeBlock;
