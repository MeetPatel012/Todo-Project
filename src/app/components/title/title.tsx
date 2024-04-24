import Link from "next/link";
import React from "react";

export default function title() {
  return (
    <div className="">
      <nav className="h-14 text-2xl text-left p-3 bg-blue-600 text-white">
      <Link href="/">Todo Manager</Link>
      </nav>
    </div>
  );
}
