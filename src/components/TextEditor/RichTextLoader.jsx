"use client";

import dynamic from "next/dynamic";
import RichTextLoader from "./RichTextLoader";

const RichTextEditor = dynamic(() => import("./RichTextEditor.client"), {
  ssr: false,
  loading: () => (
    <div className="w-full space-y-2">
      <div className="min-h-[40px] bg-[#2a2a35] rounded-md animate-pulse" />
      <div className="min-h-[200px] bg-[#2a2a35] rounded-md animate-pulse" />
    </div>
  ),
});

export default function RichTextEditorWrapper({ content, onChange }) {
  return (
    <RichTextLoader>
      <RichTextEditor content={content} onChange={onChange} />
    </RichTextLoader>
  );
}
