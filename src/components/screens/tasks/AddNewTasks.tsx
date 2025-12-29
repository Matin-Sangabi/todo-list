import Modal from "@/components/ui/Modal";
import { useAddTodo } from "@/hooks/useAddTodo";
import { cn } from "@/lib/utils";
import React from "react";

export default function AddNewTasks({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const addTasks = useAddTodo();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //validation
    if (value.trim().length === 0) {
      setError("Task title is required");
      return;
    }
    addTasks.mutate(value, {
      onSuccess: () => {
        setValue("");
        setError("");
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={open} title="Add New Task" onClose={onClose}>
      {/* Modal content goes here */}
      <form className="mb-4 space-y-4 w-full" onSubmit={onSubmit}>
        <input
          className={cn(
            "p-2 h-10 outline-none focus:border focus:border-primary rounded-md w-full border border-gray-300",
            error && "border-red-500"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="input your note ..."
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="w-full flex items-center gap-x-3 mt-4">
          <button
            className="px-4 py-2  rounded-lg w-full border border-primary text-sm cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg w-full text-sm border border-primary cursor-pointer">
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}
