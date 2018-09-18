// @flow
import { type Change, type Value, Block, Text } from '@gitbook/slate';
import { Record } from 'immutable';

const DEFAULTS = {
    containerType: 'code_block',
    lineType: 'code_line',
    exitBlockType: 'paragraph',
    selectAll: true,
    allowMarks: false,
    getIndent: null,
    onExit: null
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
    getIndent: ?(Value) => string;
    onExit: ?(Change) => ?Change;

    resolvedOnExit(change: Change): ?Change {
        if (this.onExit) {
            // Custom onExit option
            return this.onExit(change);
        }
        // Default behavior: insert an exit block
        const range = change.value.selection;

        const exitBlock = Block.create({
            type: this.exitBlockType,
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
    // Returns the indent unit to use at the given selection, as a string
    getIndent?: Value => string,
    // Custom exit handler
    // exitBlockType option is useless if onExit is provided
    onExit?: Change => Change
};

export default Options;
