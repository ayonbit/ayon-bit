import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Redo,
  Strikethrough,
  Table2,
  Underline,
  Undo,
} from "lucide-react";
import { useMemo } from "react";
import { BsBlockquoteLeft } from "react-icons/bs";
import Tooltip from "./ToolTip";

export default function MenuBar({ editor }) {
  const iconSize = 18;

  const Options = useMemo(() => {
    if (!editor) return [];

    return [
      {
        icon: <Heading1 size={iconSize} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        pressed: editor.isActive("heading", { level: 1 }),
        tooltip: "Heading 1",
      },
      {
        icon: <Heading2 size={iconSize} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        pressed: editor.isActive("heading", { level: 2 }),
        tooltip: "Heading 2",
      },
      {
        icon: <Heading3 size={iconSize} />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        pressed: editor.isActive("heading", { level: 3 }),
        tooltip: "Heading 3",
      },
      {
        icon: <Bold size={iconSize} />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        pressed: editor.isActive("bold"),
        tooltip: "Bold",
      },
      {
        icon: <Italic size={iconSize} />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        pressed: editor.isActive("italic"),
        tooltip: "Italic",
      },
      {
        icon: <Strikethrough size={iconSize} />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        pressed: editor.isActive("strike"),
        tooltip: "Strikethrough",
      },
      {
        icon: <Underline size={iconSize} />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        pressed: editor.isActive("underline"),
        tooltip: "Underline",
      },
      {
        icon: <Highlighter size={iconSize} />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        pressed: editor.isActive("highlight"),
        tooltip: "Highlight",
      },
      {
        icon: <AlignLeft size={iconSize} />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        pressed: editor.isActive({ textAlign: "left" }),
        tooltip: "Align Left",
      },
      {
        icon: <AlignCenter size={iconSize} />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        pressed: editor.isActive({ textAlign: "center" }),
        tooltip: "Align Center",
      },
      {
        icon: <AlignRight size={iconSize} />,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        pressed: editor.isActive({ textAlign: "right" }),
        tooltip: "Align Right",
      },
      {
        icon: <List size={iconSize} />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        pressed: editor.isActive("bulletList"),
        tooltip: "Bullet List",
      },
      {
        icon: <ListOrdered size={iconSize} />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive("orderedList"),
        tooltip: "Ordered List",
      },
      {
        icon: <BsBlockquoteLeft size={iconSize} />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        pressed: editor.isActive("blockquote"),
        tooltip: "Blockquote",
      },
      {
        icon: <Code2 size={iconSize} />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        pressed: editor.isActive("codeBlock"),
        tooltip: "Code Block",
      },
      {
        icon: <Minus size={iconSize} />,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        pressed: false,
        tooltip: "Horizontal Rule",
      },
      {
        icon: <Link2 size={iconSize} />,
        onClick: () => {
          const url = prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        },
        pressed: editor.isActive("link"),
        tooltip: "Insert Link",
      },
      {
        icon: <Table2 size={iconSize} />,
        onClick: () =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run(),
        pressed: false,
        tooltip: "Insert Table",
      },
      {
        icon: <Undo size={iconSize} />,
        onClick: () => editor.chain().focus().undo().run(),
        pressed: false,
        tooltip: "Undo",
      },
      {
        icon: <Redo size={iconSize} />,
        onClick: () => editor.chain().focus().redo().run(),
        pressed: false,
        tooltip: "Redo",
      },
      {
        icon: <ImageIcon size={iconSize} />,
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
        pressed: false,
        tooltip: "Insert Image",
      },
    ];
  }, [editor]);

  return (
    <div>
      {editor && (
        <div className="flex flex-wrap gap-2 border border-gray-600 rounded-md p-2 mb-3 bg-[#2a2a35]">
          {Options.map((option, idx) => (
            <Tooltip key={idx} text={option.tooltip}>
              <Toggle
                pressed={option.pressed}
                onPressedChange={option.onClick}
                className="p-1 rounded-md"
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
