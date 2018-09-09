// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(
    opts: Options,
    event: *,
    change: Change,
    editor: *
): void | Change {
    const { value } = change;
    if (!value.selection.isCollapsed) {
        return undefined;
    }

    event.preventDefault();

    // Exit the code block
    return opts.resolvedOnExit(change);
}

export default onModEnter;
