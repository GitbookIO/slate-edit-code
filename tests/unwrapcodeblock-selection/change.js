export default function(plugin, change) {
    const newState = plugin.changes.unwrapCodeBlock(change, 'paragraph');

    return newState;
};
