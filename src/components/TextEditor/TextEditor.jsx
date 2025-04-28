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
import { useMemo } from "react";
import MenuBar from "./MenuBar";

export default function RichTextEditor({ content, onChange }) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc pl-6" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6" } },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Underline,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-md max-w-[500px] max-h-[500px] w-auto h-auto mx-auto my-4 rounded-md",
        },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[200px] px-4 py-3 bg-[#2a2a35] text-white border border-gray-600 rounded-md focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="w-full">
      <label className="block font-medium text-white mb-2 mt-4">
        Editor Tool:
      </label>
      <MenuBar editor={editor} />
      <label className="block font-medium text-white mb-2 mt-4">
        Write your content:
      </label>
      <EditorContent editor={editor} />
    </div>
  );
}
