import React from "react";
import Image from "next/image";
import thinkingL from "@/assets/thinkingL.png";

export function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      Loading...
      <Image
        src={thinkingL}
        alt="Thinking"
        width={50}
        height={70}
        className="animate-bounce"
      />
    </div>
  );
}
