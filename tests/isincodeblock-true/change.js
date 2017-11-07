import assert from 'assert';

export default function(plugin, change) {
    assert.equal(plugin.utils.isInCodeBlock(change.state), true);

    return change;
};
