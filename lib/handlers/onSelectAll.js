// @flow
import { type Change } from 'slate';

import { getCurrentCode } from '../utils';
import type Options from '../options';

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(
    opts: Options,
    event: *,
    change: Change,
    editor: *
): void | Change {
    const { value } = change;
    event.preventDefault();

    const currentCode = getCurrentCode(opts, value);
    return change
        .collapseToStartOf(currentCode.getFirstText())
        .extendToEndOf(currentCode.getLastText());
}

export default onSelectAll;
