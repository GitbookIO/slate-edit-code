import Slate from 'slate';

export default function(plugin, change) {
    const schema = new Slate.Schema(plugin.schema);
    return change.normalize(schema);
}
