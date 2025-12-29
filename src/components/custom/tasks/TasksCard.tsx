import { cn } from "@/lib/utils";
import { Check, Pencil, Trash2 } from "lucide-react";

interface TasksCardProps {
  name: string;
  isCompleted: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
}

export default function TasksCard(props: TasksCardProps) {
  return (
    <div className="w-full flex items-center justify-between py-2 border-b border-b-primary/50 last:border-b-0 group">
      <div className="flex-1 flex items-center gap-x-2 ">
        {/* checkbox */}
        <div
          onClick={props.onComplete}
          className={cn(
            "size-6 min-w-6 max-w-6 rounded-sm border border-primary/50 flex items-center justify-center cursor-pointer",
            props.isCompleted && "bg-primary text-white"
          )}
        >
          {props.isCompleted && <Check className="text-white w-4 h-4" />}
        </div>
        <span
          className={cn(
            "text-base font-semibold capitalize",
            props.isCompleted && "line-through text-gray-400"
          )}
        >
          {props.name}
        </span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center gap-x-2 transition-all ease-in-out duration-150">
        <button
          onClick={props.onEdit}
          className="cursor-pointer text-gray-500 hover:text-primary"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={props.onDelete}
          className="cursor-pointer text-gray-500 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
