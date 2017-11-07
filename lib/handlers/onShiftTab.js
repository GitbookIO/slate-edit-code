// @flow
import { type Change } from 'slate';
import { getCurrentIndent } from '../utils';
import { dedentLines } from '../changes';
import type Options from '../options';

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(
    opts: Options,
    event: *,
    change: Change,
    editor: *
): void | Change {
    const { value } = change;
    event.preventDefault();
    event.stopPropagation();

    const indent = getCurrentIndent(opts, value);

    // We dedent all selected lines
    return dedentLines(opts, change, indent);
}

export default onShiftTab;
