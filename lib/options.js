// @flow
import { type Change, Block, Text } from 'slate';
import { Record } from 'immutable';

const DEFAULTS = {
    containerType: 'code_block',
    lineType: 'code_line',
    exitBlockType: 'paragraph',
    selectAll: true,
    allowMarks: false,
    onExit: (change, options) => {
        const range = change.value.selection;

        const exitBlock = Block.create({
            type: options.exitBlockType,
            nodes: [Text.create()]
        });

        change.deleteAtRange(range, { normalize: false });
        change.insertBlockAtRange(change.value.selection, exitBlock, {
            normalize: false
        });
        // Exit the code block
        change.unwrapNodeByKey(exitBlock.key);

        return change.collapseToStartOf(exitBlock);
    }
};

/**
 * The plugin options container
 */
class Options extends Record(DEFAULTS) {
    containerType: string;
    lineType: string;
    exitBlockType: string;
    selectAll: boolean;
    allowMarks: boolean;
    onExit: (Change, Options) => Change;
}

export type OptionsFormat = {
    // Type of the code containers
    containerType?: string,
    // Type of the code lines
    lineType?: string,

    // Mod+Enter will exit the code container, into the given block type.
    // Backspace at start of empty code container, will turn it into the given block type.
    exitBlockType?: string,
    // Should the plugin handle the select all inside a code container
    selectAll?: boolean,
    // Allow marks inside code blocks
    allowMarks?: boolean,
    // Custom exit handler
    // exitBlockType option is useless if onExit is provided
    onExit?: (Change, Options) => Change
};

export default Options;
