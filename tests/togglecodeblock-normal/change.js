export default function(plugin, change) {
    return plugin.changes.toggleCodeBlock(change, 'paragraph');
}
