import getIndent from './getIndent';
import getCurrentCode from './getCurrentCode';

/**
 * Detect indentation in the current code block
 * @param {Options} opts
 * @param {Value} value
 * @return {String}
 */
function getCurrentIndent(opts, value) {
    const currentCode = getCurrentCode(opts, value);
    const text = currentCode
        .getTexts()
        .map(t => t.text)
        .join('\n');
    return getIndent(text);
}

export default getCurrentIndent;
