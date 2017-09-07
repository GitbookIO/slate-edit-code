const Slate = require('slate');

module.exports = function(plugin, change) {
    const schema = new Slate.Schema(plugin.schema);
    return change
        .normalize(schema);
};
