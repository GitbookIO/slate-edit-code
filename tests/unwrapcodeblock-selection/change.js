export default function(plugin, change) {
    const newValue = plugin.changes.unwrapCodeBlock(change, 'paragraph');

    return newValue;
}
