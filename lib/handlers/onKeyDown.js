// @flow
import { type Change } from 'slate';

import { getCurrentCode } from '../utils';
import type Options from '../options';

import onTab from './onTab';
import onShiftTab from './onShiftTab';
import onEnter from './onEnter';
import onModEnter from './onModEnter';
import onBackspace from './onBackspace';
import onSelectAll from './onSelectAll';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_BACKSPACE = 'Backspace';

/**
 * User is pressing a key in the editor
 */
function onKeyDown(
    opts: Options,
    event: *,
    change: Change,
    editor: *
): void | Change {
    const { value } = change;
    const currentCode = getCurrentCode(opts, value);

    // Inside code ?
    if (!currentCode) {
        return undefined;
    }

    // Add opts in the argument list
    const args = [opts, event, change, editor];

    // Select all the code in the block (Mod+a)
    if (event.key === 'a' && event.metaKey && opts.selectAll) {
        return onSelectAll(...args);
    } else if (event.key === KEY_TAB && event.shiftKey) {
        // User is pressing Shift+Tab
        return onShiftTab(...args);
    } else if (event.key == KEY_TAB) {
        // User is pressing Tab
        return onTab(...args);
    } else if (event.key == KEY_ENTER && event.metaKey && opts.exitBlockType) {
        // User is pressing Shift+Enter
        return onModEnter(...args);
    } else if (event.key == KEY_ENTER) {
        // User is pressing Enter
        return onEnter(...args);
    } else if (event.key == KEY_BACKSPACE) {
        // User is pressing Backspace
        return onBackspace(...args);
    }
    return undefined;
}

export default onKeyDown;
