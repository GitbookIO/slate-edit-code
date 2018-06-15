import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        code_block: 'code_block',
        code_line: 'code_line',
        paragraph: 'paragraph'
    },
    inline: {
        link: 'link'
    },
    marks: {
        italic: 'italic'
    }
});

export default h;
