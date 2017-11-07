import getIndent from './getIndent';
import getCurrentCode from './getCurrentCode';

/**
 * Detect indentation in the current code block
 * @param {Options} opts
 * @param {State} state
 * @return {String}
 */
function getCurrentIndent(opts, state) {
    const currentCode = getCurrentCode(opts, state);
    const text = currentCode
        .getTexts()
        .map(t => t.text)
        .join('\n');
    return getIndent(text);
}

export default getCurrentIndent;
