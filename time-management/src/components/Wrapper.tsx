import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}