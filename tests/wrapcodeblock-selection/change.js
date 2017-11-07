import assert from 'assert';

export default function(plugin, change) {
    plugin.changes.wrapCodeBlock(change);

    assert.equal(change.state.startOffset, 5);

    return change;
};
