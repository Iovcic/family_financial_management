"use client";

import { IBEBudgetWithCategories, IBECategory } from "@/app/_types/be_types";
import { BudgetCard } from "./BudgetCard";
import { use } from "react";

export const BudgetCardList = ({
  data,
  categories,
}: {
  data: Promise<IBEBudgetWithCategories[]>;
  categories: Promise<IBECategory[]>;
}) => {
  const allBudgets = use(data);
  const allCategories = use(categories);
  return allBudgets.map((budget) => (
    <BudgetCard key={budget.id} categories={allCategories} data={budget} />
  ));
};
