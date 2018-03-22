// @flow
import Options, { type OptionsFormat } from './options';
import { deserializeCode, isInCodeBlock } from './utils';
import {
    wrapCodeBlockByKey,
    unwrapCodeBlockByKey,
    wrapCodeBlock,
    unwrapCodeBlock,
    toggleCodeBlock
} from './changes';

import { schema } from './validation';

/**
 * The core of the plugin, which does not relies on `slate-react`, and includes
 * everything but behavior and rendering logic.
 */
function core(optsParam: OptionsFormat): Object {
    const opts = new Options(optsParam);

    return {
        schema: schema(opts),

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

export default core;
