import dynamic from 'next/dynamic';
import { useMemo, useRef, ChangeEvent } from 'react';
import { imageUpload } from '@repository/noticeRepository';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  },
);

interface QuillEditorProps {
  theme: string;
  value?: string;
  onChange?: (() => ChangeEvent<HTMLInputElement>) | any;
  placeHolder?: string;
  readOnly?: boolean;
}

export default function QuillEditor({
  theme = 'snow',
  value = '',
  onChange = () => {},
  placeHolder = '',
  readOnly = false,
}: QuillEditorProps) {
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('multipartFile', file[0]);
        try {
          const {
            data: { data },
          } = await imageUpload(formData);
          const range = quillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = quillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${data}/>`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['clean'],
          ['code-block'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <ReactQuill
      forwardedRef={quillRef}
      style={{ height: '70vh' }}
      theme={theme}
      modules={modules}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      readOnly={readOnly}
    />
  );
}
