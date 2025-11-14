import { Suspense } from "react";
import { BudgetCardList } from "./_components/budget_card/BudgetCardList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="grid grid-cols-[200px_1fr] gap-4 w-full">
          <div className="join join-vertical">
            <button className="btn join-item">2025</button>
            <button className="btn join-item">2024</button>
            <button className="btn join-item">2023</button>
          </div>
        </div>
      </main>
    </div>
  );
}
