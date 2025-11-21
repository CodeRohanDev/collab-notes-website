'use client';

import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';

interface NoteEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export function NoteEditor({ initialContent, onChange, readOnly = false }: NoteEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [Quill, setQuill] = useState<any>(null);

  useEffect(() => {
    // Load Quill dynamically
    import('quill').then((module) => {
      setQuill(() => module.default);
      
      // Load Quill CSS
      if (!document.querySelector('link[href*="quill.snow.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
        document.head.appendChild(link);
      }
    });
  }, []);

  useEffect(() => {
    if (!editorRef.current || isInitialized || !Quill) return;

    // Initialize Quill
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      readOnly,
      placeholder: 'Start writing your note...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'list': 'check' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          ['link'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'],
        ],
      },
    });

    // Set initial content
    if (initialContent) {
      try {
        const delta = JSON.parse(initialContent);
        quill.setContents(delta);
      } catch {
        quill.setText(initialContent);
      }
    }

    // Debounced change handler
    const debouncedOnChange = debounce((content: string) => {
      onChange(content);
    }, 500);

    // Listen to changes
    quill.on('text-change', () => {
      const content = JSON.stringify(quill.getContents());
      debouncedOnChange(content);
    });

    quillRef.current = quill;
    setIsInitialized(true);

    return () => {
      debouncedOnChange.cancel();
    };
  }, [Quill]);

  if (!Quill) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-editor-container">
      <div ref={editorRef} className="min-h-[500px]" />
      
      <style jsx global>{`
        /* Editor Container */
        .note-editor-container .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          border: none !important;
        }
        
        .note-editor-container .ql-editor {
          min-height: 500px;
          padding: 0;
          line-height: 1.8;
          color: #111827 !important;
        }
        
        .note-editor-container .ql-editor p,
        .note-editor-container .ql-editor div,
        .note-editor-container .ql-editor span {
          color: #111827 !important;
        }
        
        .note-editor-container .ql-editor.ql-blank::before {
          color: #9CA3AF !important;
          font-style: normal;
          font-size: 16px;
        }
        
        /* Toolbar Styling */
        .note-editor-container .ql-toolbar {
          border: none !important;
          border-bottom: 2px solid #f3f4f6 !important;
          padding: 12px 0 16px 0;
          background: transparent;
          margin-bottom: 24px;
        }
        
        .note-editor-container .ql-toolbar button {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .note-editor-container .ql-toolbar button:hover {
          background: #f3f4f6;
          transform: scale(1.05);
        }
        
        .note-editor-container .ql-toolbar button.ql-active {
          background: #eef2ff;
          color: #6366f1;
        }
        
        .note-editor-container .ql-toolbar .ql-stroke {
          stroke: #6b7280;
          transition: stroke 0.2s;
        }
        
        .note-editor-container .ql-toolbar button:hover .ql-stroke {
          stroke: #4b5563;
        }
        
        .note-editor-container .ql-toolbar button.ql-active .ql-stroke {
          stroke: #6366f1;
        }
        
        .note-editor-container .ql-toolbar .ql-fill {
          fill: #6b7280;
          transition: fill 0.2s;
        }
        
        .note-editor-container .ql-toolbar button:hover .ql-fill {
          fill: #4b5563;
        }
        
        .note-editor-container .ql-toolbar button.ql-active .ql-fill {
          fill: #6366f1;
        }
        
        /* Picker Styling */
        .note-editor-container .ql-toolbar .ql-picker {
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .note-editor-container .ql-toolbar .ql-picker:hover {
          background: #f3f4f6;
        }
        
        .note-editor-container .ql-toolbar .ql-picker-label {
          border: none;
          padding: 6px 8px;
          color: #6b7280;
        }
        
        .note-editor-container .ql-toolbar .ql-picker-label:hover {
          color: #4b5563;
        }
        
        /* Content Styling */
        .note-editor-container .ql-editor h1 {
          font-size: 2em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: #111827 !important;
        }
        
        .note-editor-container .ql-editor h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: #111827 !important;
        }
        
        .note-editor-container .ql-editor h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: #111827 !important;
        }
        
        .note-editor-container .ql-editor blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 16px;
          margin: 16px 0;
          color: #6b7280 !important;
          font-style: italic;
        }
        
        .note-editor-container .ql-editor code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.9em;
          color: #dc2626;
        }
        
        .note-editor-container .ql-editor pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 16px 0;
        }
        
        .note-editor-container .ql-editor pre code {
          background: transparent;
          color: #f3f4f6;
          padding: 0;
        }
        
        .note-editor-container .ql-editor ul,
        .note-editor-container .ql-editor ol {
          padding-left: 1.5em;
          margin: 12px 0;
        }
        
        .note-editor-container .ql-editor li {
          margin: 6px 0;
        }
        
        .note-editor-container .ql-editor a {
          color: #6366f1 !important;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .note-editor-container .ql-editor a:hover {
          color: #4f46e5 !important;
        }
        
        /* Checklist Styling */
        .note-editor-container .ql-editor .ql-list-check {
          list-style: none;
          padding-left: 0;
        }
        
        .note-editor-container .ql-editor .ql-list-check > li {
          position: relative;
          padding-left: 32px;
        }
        
        .note-editor-container .ql-editor .ql-list-check > li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          width: 18px;
          height: 18px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          background: white;
          transition: all 0.2s;
        }
        
        .note-editor-container .ql-editor .ql-list-check > li.ql-checked::before {
          background: #6366f1;
          border-color: #6366f1;
        }
        
        .note-editor-container .ql-editor .ql-list-check > li.ql-checked::after {
          content: '✓';
          position: absolute;
          left: 4px;
          top: 2px;
          color: white;
          font-size: 14px;
          font-weight: bold;
        }
        
        .note-editor-container .ql-editor .ql-list-check > li.ql-checked {
          color: #9ca3af !important;
          text-decoration: line-through;
        }
        
        /* Focus State */
        .note-editor-container .ql-editor:focus {
          outline: none;
        }
        
        /* Selection */
        .note-editor-container .ql-editor ::selection {
          background: #ddd6fe;
        }
        
        /* Force text color for all content */
        .note-editor-container .ql-editor * {
          color: inherit;
        }
        
        .note-editor-container .ql-editor > * {
          color: #111827 !important;
        }
        
        /* Override Quill's default color classes */
        .note-editor-container .ql-editor .ql-color-white {
          color: #ffffff !important;
        }
        
        .note-editor-container .ql-editor .ql-color-black {
          color: #000000 !important;
        }
        
        /* Ensure toolbar icons are visible */
        .note-editor-container .ql-toolbar .ql-picker-label {
          color: #6b7280 !important;
        }
        
        .note-editor-container .ql-toolbar .ql-picker-options {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 4px;
        }
        
        .note-editor-container .ql-toolbar .ql-picker-item {
          color: #111827 !important;
        }
        
        .note-editor-container .ql-toolbar .ql-picker-item:hover {
          background: #f3f4f6;
          color: #111827 !important;
        }
      `}</style>
    </div>
  );
}
