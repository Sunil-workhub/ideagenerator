import { useRef, useEffect } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered,
  AlignLeft, AlignCenter, Heading1, Heading2,
} from 'lucide-react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const ToolbarBtn = ({ onClick, icon: Icon, title }: { onClick: () => void; icon: React.ElementType; title: string }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
  >
    <Icon className="h-3.5 w-3.5" />
  </button>
);

const RichTextEditor = ({ value, onChange, readOnly = false, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (editorRef.current && value && !initialized.current) {
      editorRef.current.innerHTML = value;
      initialized.current = true;
    }
  }, [value]);

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    if (onChange && editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (onChange && editorRef.current) onChange(editorRef.current.innerHTML);
  };

  if (readOnly) {
    return (
      <div
        className="text-sm leading-relaxed [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-1 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-0.5"
        dangerouslySetInnerHTML={{ __html: value || '<span class="text-muted-foreground italic">No description provided</span>' }}
      />
    );
  }

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <div className="flex items-center gap-0.5 px-2 py-1 border-b bg-muted/50 flex-wrap">
        <ToolbarBtn onClick={() => execCmd('bold')} icon={Bold} title="Bold" />
        <ToolbarBtn onClick={() => execCmd('italic')} icon={Italic} title="Italic" />
        <ToolbarBtn onClick={() => execCmd('underline')} icon={Underline} title="Underline" />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => execCmd('formatBlock', 'H1')} icon={Heading1} title="Heading 1" />
        <ToolbarBtn onClick={() => execCmd('formatBlock', 'H2')} icon={Heading2} title="Heading 2" />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => execCmd('insertOrderedList')} icon={ListOrdered} title="Numbered List" />
        <ToolbarBtn onClick={() => execCmd('insertUnorderedList')} icon={List} title="Bullet List" />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => execCmd('justifyLeft')} icon={AlignLeft} title="Align Left" />
        <ToolbarBtn onClick={() => execCmd('justifyCenter')} icon={AlignCenter} title="Align Center" />
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder || 'Describe your idea...'}
        className="min-h-[120px] max-h-[300px] overflow-y-auto p-3 text-sm focus:outline-none [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
};

export default RichTextEditor;
