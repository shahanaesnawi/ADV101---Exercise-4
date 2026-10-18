"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type WindowProps = {
  title: string;          
  pills: string[];       
  onClose?: () => void;   
  children: ReactNode;    
};

export default function Window({ title, pills, onClose, children }: WindowProps) {
  const router = useRouter();

  return (
    <main className="stage">
      <div className="window">
        <div className="topbar">
          <div className="nav">
            <button className="circle" aria-label="Back" onClick={() => router.back()}>‹</button>
            <button className="circle" aria-label="Forward" onClick={() => router.forward()}>›</button>
          </div>
          <span className="topbar-title">{title}</span>
          <button className="circle" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        <div className="pills">
          {pills.map((p) => (
            <span className="pill" key={p}>{p}</span>
          ))}
        </div>

        <div className="panel">{children}</div>
      </div>
    </main>
  );
}