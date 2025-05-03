"use client";

import { Toggle } from "@/components/ui/toggle";
import { useMemo } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaCodeBranch,
  FaHighlighter,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaObjectGroup,
  FaObjectUngroup,
  FaParagraph,
  FaPlus,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaTable,
  FaTasks,
  FaTh,
  FaTrash,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import Tooltip from "./ToolTip";
import "./styles.scss";

export default function MenuBar({ editor }) {
  const menuOptions = useMemo(() => {
    if (!editor) return [];

    return [
      // Text Formatting
      {
        icon: <FaBold />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
        tooltip: "Bold",
      },
      {
        icon: <FaItalic />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        tooltip: "Italic",
      },
      {
        icon: <FaUnderline />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
        tooltip: "Underline",
      },
      {
        icon: <FaStrikethrough />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        tooltip: "Strikethrough",
      },
      {
        icon: <FaHighlighter />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        isActive: editor.isActive("highlight"),
        tooltip: "Highlight",
      },
      {
        icon: <FaCode />,
        onClick: () => editor.chain().focus().toggleCode().run(),
        isActive: editor.isActive("code"),
        tooltip: "Code",
      },

      // Headings
      {
        icon: <span className="font-bold">H1</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
        tooltip: "Heading 1",
      },
      {
        icon: <span className="font-bold">H2</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
        tooltip: "Heading 2",
      },
      {
        icon: <span className="font-bold">H3</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive("heading", { level: 3 }),
        tooltip: "Heading 3",
      },
      {
        icon: <span className="font-bold">H4</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: editor.isActive("heading", { level: 4 }),
        tooltip: "Heading 4",
      },
      {
        icon: <span className="font-bold">H5</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: editor.isActive("heading", { level: 5 }),
        tooltip: "Heading 5",
      },
      {
        icon: <span className="font-bold">H6</span>,
        onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: editor.isActive("heading", { level: 6 }),
        tooltip: "Heading 6",
      },
      {
        icon: <FaParagraph />,
        onClick: () => editor.chain().focus().setParagraph().run(),
        isActive: editor.isActive("paragraph"),
        tooltip: "Paragraph",
      },

      // Text Alignment
      {
        icon: <FaAlignLeft />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: editor.isActive({ textAlign: "left" }),
        tooltip: "Align Left",
      },
      {
        icon: <FaAlignCenter />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: editor.isActive({ textAlign: "center" }),
        tooltip: "Align Center",
      },
      {
        icon: <FaAlignRight />,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: editor.isActive({ textAlign: "right" }),
        tooltip: "Align Right",
      },
      {
        icon: <FaAlignJustify />,
        onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        isActive: editor.isActive({ textAlign: "justify" }),
        tooltip: "Justify",
      },

      // Lists
      {
        icon: <FaListUl />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
        tooltip: "Bullet List",
      },
      {
        icon: <FaListOl />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        tooltip: "Ordered List",
      },
      {
        icon: <FaTasks />,
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        isActive: editor.isActive("taskList"),
        tooltip: "Task List",
      },

      // Blocks
      {
        icon: <FaQuoteLeft />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: editor.isActive("blockquote"),
        tooltip: "Blockquote",
      },
      {
        icon: <FaCodeBranch />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
        tooltip: "Code Block",
      },
      {
        icon: <MdHorizontalRule />,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: false,
        tooltip: "Horizontal Rule",
      },

      // Links & Media
      {
        icon: <FaLink />,
        onClick: () => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);

          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }

          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        },
        isActive: editor.isActive("link"),
        tooltip: "Link",
      },
      {
        icon: <FaImage />,
        onClick: () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              const src = reader.result;
              editor.chain().focus().setImage({ src }).run();
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        isActive: false,
        tooltip: "Image",
      },

      // Table Controls
      {
        icon: <FaTable />,
        onClick: () =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run(),
        isActive: false,
        tooltip: "Insert Table",
      },
      {
        icon: <FaPlus />,
        onClick: () => editor.chain().focus().addColumnAfter().run(),
        isActive: false,
        disabled: !editor.can().addColumnAfter(),
        tooltip: "Add Column",
      },
      {
        icon: <FaPlus style={{ transform: "rotate(90deg)" }} />,
        onClick: () => editor.chain().focus().addRowAfter().run(),
        isActive: false,
        disabled: !editor.can().addRowAfter(),
        tooltip: "Add Row",
      },
      {
        icon: <FaTrash />,
        onClick: () => editor.chain().focus().deleteColumn().run(),
        isActive: false,
        disabled: !editor.can().deleteColumn(),
        tooltip: "Delete Column",
      },
      {
        icon: <FaTrash style={{ transform: "rotate(90deg)" }} />,
        onClick: () => editor.chain().focus().deleteRow().run(),
        isActive: false,
        disabled: !editor.can().deleteRow(),
        tooltip: "Delete Row",
      },
      {
        icon: <FaTh />,
        onClick: () => editor.chain().focus().deleteTable().run(),
        isActive: false,
        disabled: !editor.can().deleteTable(),
        tooltip: "Delete Table",
      },
      {
        icon: <FaObjectGroup />,
        onClick: () => editor.chain().focus().mergeCells().run(),
        isActive: false,
        disabled: !editor.can().mergeCells(),
        tooltip: "Merge Cells",
      },
      {
        icon: <FaObjectUngroup />,
        onClick: () => editor.chain().focus().splitCell().run(),
        isActive: false,
        disabled: !editor.can().splitCell(),
        tooltip: "Split Cell",
      },

      // History
      {
        icon: <FaUndo />,
        onClick: () => editor.chain().focus().undo().run(),
        isActive: false,
        disabled: !editor.can().undo(),
        tooltip: "Undo",
      },
      {
        icon: <FaRedo />,
        onClick: () => editor.chain().focus().redo().run(),
        isActive: false,
        disabled: !editor.can().redo(),
        tooltip: "Redo",
      },
    ];
  }, [editor]);

  return (
    <div className="editor-menu-bar">
      {editor && (
        <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-background">
          {menuOptions.map((option, index) => (
            <Tooltip key={index} text={option.tooltip}>
              <Toggle
                size="sm"
                pressed={option.isActive}
                onPressedChange={option.onClick}
                disabled={option.disabled}
                className="px-2 py-1 h-auto text-sm"
                aria-label={option.tooltip}
              >
                {option.icon}
              </Toggle>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
