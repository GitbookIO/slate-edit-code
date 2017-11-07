import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditList from '../lib';

describe('slate-edit-code', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expected = readMetadata.sync(
                path.resolve(dir, 'expected.yaml')
            );
            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;

            const valueInput = Slate.Value.fromJSON(input);

            const newChange = runChange(plugin, valueInput.change());

            const newDocJSon = newChange.value.toJSON();

            expect(newDocJSon).toEqual(Slate.Value.fromJSON(expected).toJSON());
        });
    });
});
