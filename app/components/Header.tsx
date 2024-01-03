"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  const pathName = usePathname();
  return (
    <div className="flex gap-x-4 sticky top-0 text-red-300  bg-blue-600 px-2  z-30">
      <Link href={"/"} className={pathName === "/" ? "bg-white/50" : "" }>
        <div className="">Home</div>
      </Link>
      <Link href="/chat" className={pathName === "/chat" ? "bg-white/50" : "" }>
        <div className="">Chat</div>
      </Link>
      <div className="">extra</div>
    </div>
  );
}
