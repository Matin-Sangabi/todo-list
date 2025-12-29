import Image from "next/image";
import React from "react";

export default function EmptyTasks() {
  return (
    <div className="w-full flex items-center justify-center ">
      <Image
        src={"/LIST.png"}
        alt="Empty Tasks"
        width={500}
        height={500}
        priority
        className="w-full object-contain max-w-lg select-none"
      />
    </div>
  );
}
