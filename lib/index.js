// @flow
import Options from './options';
import { onKeyDown, onPaste } from './handlers';
import { deserializeCode, isInCodeBlock } from './utils';
import {
    wrapCodeBlockByKey,
    unwrapCodeBlockByKey,
    wrapCodeBlock,
    unwrapCodeBlock,
    toggleCodeBlock
} from './changes';

import { schema, validateNode } from './validation';

/**
 * A Slate plugin to handle keyboard events in code blocks.
 */

function EditCode(opts: Options): Object {
    opts = new Options(opts);

    return {
        onKeyDown: onKeyDown.bind(null, opts),
        onPaste: onPaste.bind(null, opts),

        schema: schema(opts),
        validateNode: validateNode(opts),

        changes: {
            unwrapCodeBlockByKey: unwrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlockByKey: wrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlock: wrapCodeBlock.bind(null, opts),
            unwrapCodeBlock: unwrapCodeBlock.bind(null, opts),
            toggleCodeBlock: toggleCodeBlock.bind(null, opts)
        },

        utils: {
            isInCodeBlock: isInCodeBlock.bind(null, opts),
            deserializeCode: deserializeCode.bind(null, opts)
        }
    };
}

export default EditCode;
