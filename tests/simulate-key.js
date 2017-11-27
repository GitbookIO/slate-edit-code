// @flow
import { parseHotkey } from 'is-hotkey';

// Returns a fake Event object for the given hotkey
export default function simulateKey(hotkey: string): Event {
    return {
        preventDefault() {},
        stopPropagation() {},
        ...parseHotkey(hotkey, { byKey: true })
    };
}
