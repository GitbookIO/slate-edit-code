// @flow
import Options, { type OptionsFormat } from './options';
import { onKeyDown, onPaste } from './handlers';
import core from './core';

/**
 * A Slate plugin to handle keyboard events in code blocks.
 */

function EditCode(optsParam?: OptionsFormat = {}): Object {
    const opts = new Options(optsParam);

    const corePlugin = core(opts);
    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts),
        onPaste: onPaste.bind(null, opts)
    };
}

export default EditCode;
