import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="flex gap-x-4 sticky top-0 text-red-300  bg-blue-600 px-2  z-30">
      <Link href={"/"}>
        <div className="">Home</div>
      </Link>
      <Link href="/chat">
        <div className="">Chat</div>
      </Link>
      <div className="">extra</div>
    </div>
  );
}
