import { useState, useRef, useMemo, FC } from 'react';
import JoditEditor from 'jodit-react';
import { placeholder } from 'jodit/esm/plugins/placeholder/placeholder';
import { Button } from '@mantine/core';

interface ExampleProps {
    placeholder?: string;
}

export const RichTextEditor: FC<ExampleProps> = ({placeholder}) => {
    const editor:any = useRef<placeholder | null>(null);
    const [content1, setContent1] = useState<string>('');
    const [content2, setContent2] = useState<string>('');
    const [content3, setContent3] = useState<string>('');

    const config:any = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...',
        useSearch: false,
        uploader: {
            insertImageAsBase64URI: true
        },
        toolbarButtonSize: 'middle',
        showCharsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        defaultActionOnPaste: 'insert_only_text',
        toolbarInlineForSelection: true,
        showPlaceholder: false,
    }), []);

    return (
        <section id='richTextEditor'>
            <div className="navigation">
                <span className="material-symbols-outlined">arrow_circle_left</span>
            </div>
            <p className='designHeading'>Microservices Architecture</p>
            <h1>Question 5</h1>
            <div className='pagination'>
                <Button color="gray" mt={12}>&lt; Back</Button>
                <Button color="gray" mt={12}>Next &gt;</Button>
            </div>
            <JoditEditor
            ref={editor}
            value={content1}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onChange={newContent => setContent1(newContent)}
            />
            <h3>Answer</h3>
            <JoditEditor
            ref={editor}
            value={content2}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onChange={newContent => setContent2(newContent)}
            />
            <h3>Explanation</h3>
            <JoditEditor
            ref={editor}
            value={content3}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onChange={newContent => setContent3(newContent)}
            />
            
        </section>
    );
}