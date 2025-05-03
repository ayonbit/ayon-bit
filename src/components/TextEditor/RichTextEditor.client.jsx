"use client";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import MenuBar from "./MenuBar";
import "./styles.scss";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {};

          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export default function RichTextEditor({ content, onChange }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-6" },
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-6" },
          keepMarks: true,
          keepAttributes: true,
        },
        dropcursor: {
          color: "#3B82F6",
          width: 4,
        },
        paragraph: true,
        hardBreak: true,
        horizontalRule: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Highlight.configure({ multicolor: true }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["ftp", "mailto"],
        HTMLAttributes: {
          class: "text-blue-400 hover:underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full my-4 border-collapse",
        },
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md max-w-full h-auto mx-auto my-4",
        },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: isMounted ? content || "<p></p>" : "<p></p>",
    autofocus: "end",
    injectCSS: false,
    editorProps: {
      immediatelyRender: false,
      enablePersistence: false,
      attributes: {
        class:
          "tiptap min-h-[200px] px-4 py-3 bg-[#2a2a35] text-white border border-gray-600 rounded-md focus:outline-none prose prose-invert max-w-none",
        spellcheck: "true",
        autocorrect: "on",
      },
      handlePaste: (view, event) => {
        if (event.clipboardData?.files?.length > 0) {
          const file = event.clipboardData.files[0];
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: e.target.result,
                    alt: file.name,
                    title: file.name,
                  })
                  .run();
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: e.target.result,
                    alt: file.name,
                    title: file.name,
                  })
                  .run();
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onCreate: () => {
      setIsReady(true);
    },
    onDestroy: () => {
      setIsReady(false);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>");
    }
  }, [content, editor]);

  if (!isMounted || !editor || !isReady) {
    return (
      <div className="w-full space-y-2">
        <div className="min-h-[40px] bg-[#2a2a35] rounded-md animate-pulse"></div>
        <div className="min-h-[200px] bg-[#2a2a35] rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <label className="block font-medium text-white">Editor Tool:</label>
      <MenuBar editor={editor} />
      <label className="block font-medium text-white">
        Write your content:
      </label>
      <EditorContent editor={editor} />
    </div>
  );
}
