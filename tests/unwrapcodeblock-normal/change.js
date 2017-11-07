module.exports = function(plugin, change) {
    return plugin.changes.unwrapCodeBlock(change, 'paragraph');
};
