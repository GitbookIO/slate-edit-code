import assert from 'assert';

export default function(plugin, change) {
    plugin.changes.wrapCodeBlock(change);

    assert.equal(change.value.selection.start.offset, 5);

    return change;
}
