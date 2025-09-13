'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { createLowlight, common } from 'lowlight';
import { useCallback, useEffect } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write your content here...',
  className = '',
  readOnly = false
}: RichTextEditorProps) {
  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4'
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent-green hover:text-accent-green/80 underline cursor-pointer'
        }
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-black/20 border border-white/10 rounded-lg p-4 my-4 overflow-x-auto'
        }
      }),
      TextStyle,
      Color
    ],
    content,
    immediatelyRender: false,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4'
      }
    }
  });

  // Ensure content is properly loaded when it changes (for edit mode)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Only update if content is actually different to prevent cursor jumping
      const currentContent = editor.getHTML();
      const normalizedContent = content || '';
      const normalizedCurrentContent = currentContent === '<p></p>' ? '' : currentContent;
      
      if (normalizedContent !== normalizedCurrentContent) {
        editor.commands.setContent(normalizedContent, { emitUpdate: false });
      }
    }
  }, [editor, content]);

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className={`border border-white/20 rounded-xl bg-white/5 animate-pulse ${className}`}>
        <div className="h-12 bg-white/5 border-b border-white/10 rounded-t-xl"></div>
        <div className="h-64 p-4">
          <div className="h-4 bg-white/10 rounded mb-3"></div>
          <div className="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-white/20 rounded-xl bg-white/5 focus-within:border-accent-green/50 transition-colors ${className}`}>
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/10 bg-white/5 rounded-t-xl">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('bold')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('italic')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('strike')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('code')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-white/20 mx-2" />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('heading', { level: 1 })
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('heading', { level: 2 })
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('heading', { level: 3 })
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-white/20 mx-2" />

          {/* Lists and Quote */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('bulletList')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('orderedList')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('blockquote')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-white/20 mx-2" />

          {/* Media and Links */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={setLink}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('link')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={addImage}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Add Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded-lg transition-colors ${
                editor.isActive('codeBlock')
                  ? 'bg-accent-green text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Code Block"
            >
              <Type className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-white/20 mx-2" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <EditorContent 
        editor={editor} 
        className={readOnly ? 'prose prose-invert max-w-none p-4' : ''}
      />
    </div>
  );
}