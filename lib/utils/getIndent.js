// @flow
import detectIndent from 'detect-indent';

const DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 */
function getIndent(
    text: string,
    defaultValue?: string = DEFAULT_INDENTATION
): string {
    return detectIndent(text).indent || defaultValue;
}

export default getIndent;
