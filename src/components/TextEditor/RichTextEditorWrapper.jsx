"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LoadingState = () => (
  <div className="w-full space-y-2">
    <div className="min-h-[40px] bg-[#2a2a35] rounded-md animate-pulse"></div>
    <div className="min-h-[200px] bg-[#2a2a35] rounded-md animate-pulse"></div>
  </div>
);

const RichTextEditor = dynamic(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        import("./RichTextEditor.client").then((mod) => resolve(mod.default));
      }, 50);
    });
  },
  {
    ssr: false,
    loading: () => <LoadingState />,
  }
);

export default function RichTextEditorWrapper({ content, onChange }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <RichTextEditor content={content} onChange={onChange} />
    </Suspense>
  );
}
