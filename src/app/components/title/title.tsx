import Link from "next/link";
import React from "react";

export default function title() {
  return (
    <div className="">
      <nav className="h-16 text-2xl text-left p-4 bg-blue-600 text-white">
        <div className="flex justify-left items-center gap-4">
          <img className="w-9 h-9" src="./animated.gif" alt="" />
          <Link href="/">Todo Manager</Link>
        </div>
      </nav>
    </div>
  );
}
