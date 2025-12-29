"use client";
import { MoonIcon, Search, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface TasksSearchProps {
  searchTerm?: string;
  onSearchTermChange?: (newTerm: string) => void;
}

export default function TasksSearch(props: TasksSearchProps) {
  const { setTheme, themes, theme } = useTheme();

  const toggleTheme = () => {
    if (themes?.includes("dark") && themes?.includes("light")) {
      setTheme(theme === "dark" ? "light" : "dark");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="w-full flex items-center flex-wrap gap-5">
      <div className="flex-1 group py-2 pl-5 pr-2 h-10 dark:bg-gray-800  flex items-center justify-between  focus-within:ring focus-within:shadow-2xl focus-within:ring-primary transition-all ease-in-out duration-150 cursor-pointer bg-white border border-gray-300 rounded-lg ">
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 outline-none mr-2  "
          value={props.searchTerm}
          onChange={(e) => props.onSearchTermChange?.(e.target.value)}
        />
        <Search className="w-5 h-5 ml-2 group-focus-within:text-primary" />
      </div>
      <button
        onClick={toggleTheme}
        className="size-10 cursor-pointer rounded-md min-w-10 max-w-10 flex items-center justify-center bg-primary text-white"
      >
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
