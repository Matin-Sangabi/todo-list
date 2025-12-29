import Tasks from "@/components/screens/tasks/Tasks";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="space-y-6 relative p-2">
      <div className="w-full p-2 text-center flex items-center justify-center">
        <h1 className="text-base lg:text-2xl font-bold uppercase ">
          Todo List
        </h1>
      </div>
      {/* header */}
      <Suspense fallback={<div>Loading...</div>}>
        <Tasks />
      </Suspense>
    </main>
  );
}
