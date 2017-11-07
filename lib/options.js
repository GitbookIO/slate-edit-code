import { Record } from 'immutable';

const DEFAULTS = {
    // Type of the code containers
    containerType: 'code_block',
    // Type of the code lines
    lineType: 'code_line',

    // Mod+Enter will exit the code container, into the given block type.
    // Backspace at start of empty code container, will turn it into the given block type.
    exitBlockType: 'paragraph',
    // Should the plugin handle the select all inside a code container
    selectAll: true,
    // Allow marks inside code blocks
    allowMarks: false,
    // Custom exit handler
    // exitBlockType option is useless if onExit is provided
    onExit: (change, options) => {
        // Exit the code block
        change.insertBlock({ type: options.exitBlockType });

        const inserted = change.value.startBlock;
        return change.unwrapNodeByKey(inserted.key);
    }
};

/**
 * The plugin options
 */
class Options extends (new Record(DEFAULTS)) {}

export default Options;
