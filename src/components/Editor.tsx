import { lowlight } from "lowlight/lib/core";
import StarterKit from "@tiptap/starter-kit";
import "highlight.js/styles/tokyo-night-dark.css";
import js from "highlight.js/lib/languages/javascript";
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { BubbleButton } from "./BubbleButton";
import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode, RxChevronDown, RxChatBubble } from 'react-icons/rx';

lowlight.registerLanguage("js", js);

export function Editor() {

  const editor = useEditor({
    extensions: [StarterKit, CodeBlockLowlight.configure({ lowlight })],
    content: "<p>Hello World!</p>",
  });

  return (
    <>
        <EditorContent
        className="max-w-[700w] mx-auto pt-16 prose prose-invert prose-orange"
        editor={editor}
        />
        {editor && (
            <FloatingMenu
                className="bg-zinc-700 py-2 px-1 shadow-xl border gap-1 border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col" 
                editor={editor}
                shouldShow={({ state }) => {
                    
                    const { $from } = state.selection
                    const currentLineText = $from.nodeBefore?.textContent

                    return currentLineText === '/';
                }}
            >
                <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
                    <img
                        className="w-12 border border-zinc-600 rounded"
                        src="http://www.notion.so/images/blocks/text/en-US.png"
                        alt="Text"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-sm">Text</span>
                        <span className="text-xm text-zinc-400">Just start writing with plain text.</span>
                    </div>
                </button>

                <button 
                    className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}    
                >
                    <img
                        className="w-12 border border-zinc-600 rounded"
                        src="http://www.notion.so/images/blocks/header.57a7576a.png"
                        alt="Heading"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-sm">Heading 1</span>
                        <span className="text-xm text-zinc-400">Big section heading.</span>
                    </div>
                </button>
            </FloatingMenu>
        )}
        {editor && (
            <BubbleMenu 
                className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600" editor={editor}
            >
                <BubbleButton>Text<RxChevronDown /></BubbleButton>
                <BubbleButton>Comment<RxChatBubble /></BubbleButton>
                <div className="flex items-center">
                    <BubbleButton 
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        data-active={editor.isActive('bold')}
                    >
                        <RxFontBold className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}    
                        data-active={editor.isActive('italic')}
                    >
                        <RxFontItalic className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}    
                        data-active={editor.isActive('strike')}
                    >
                        <RxStrikethrough className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleCode().run()}    
                        data-active={editor.isActive('code')}
                    >
                        <RxCode className="w-4 h-4" />
                    </BubbleButton>
                </div>
            </BubbleMenu>
        )}
    </>
  );
}
