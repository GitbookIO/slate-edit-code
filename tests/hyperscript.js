import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        code_block: 'code_block',
        code_line: 'code_line',
        paragraph: 'paragraph',
        default: 'default'
    },
    inlines: {
        link: 'link',
        'unknown-inline': 'unknown-inline'
    },
    marks: {
        italic: 'italic'
    }
});

export default h;
