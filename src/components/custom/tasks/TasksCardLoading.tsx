import { cn } from "@/lib/utils";

export default function TasksCardLoading() {
  return (
    <div className="w-full flex items-center justify-between py-2 border-b border-b-gray-300/50 last:border-b-0 group">
      <div className="flex-1 flex items-center gap-x-2 ">
        {/* checkbox */}
        <div
          className={cn(
            "size-6 min-w-6 max-w-6 rounded-sm bg-gray-300 animate-pulse flex items-center justify-center cursor-pointer"
          )}
        ></div>
        <span className="text-base font-semibold capitalize w-[70%] h-2 rounded-xl bg-gray-300 animate-pulse"></span>
      </div>
    </div>
  );
}
