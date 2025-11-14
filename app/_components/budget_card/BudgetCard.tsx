"use client";
import { PlusIcon } from "@/app/_icons";
import { Expense } from "./Expense";
import { useId, useState } from "react";
import {
  IBEBudgetWithCategories,
  IBECategory,
  IBECategoryBudgetDetail,
} from "@/app/_types/be_types";
import { getMonthName } from "@/lib/int";
import { createBudgetCategory, updateBudgetCategory } from "@/app/_api/budget";
const emptyExpense: IBECategoryBudgetDetail = {
  id: Date.now(),
  category_name: "",
  amount: 0,
  remaining_amount: 0,
  category_id: 0,
  description: null,
};

export const BudgetCard = ({
  data,
  categories,
}: {
  data: IBEBudgetWithCategories;
  categories: IBECategory[];
}) => {
  const [budgetCategories, setBudgetCategories] = useState([
    ...data.category_budgets,
    emptyExpense,
  ]);
  const [totalBudget, setTotalBudget] = useState(Number(data.total_budget));
  const budgetAmountId = useId();
  const savingsId = useId();

  const handleAddCategory = () => {
    setBudgetCategories([...budgetCategories, { ...emptyExpense, id: Date.now() }]);
  };

  const handleEditBudgetCategory = async (
    id: number,
    field: keyof IBECategoryBudgetDetail,
    value: string | number
  ) => {
    const updatedCategories = budgetCategories.map((budgetCategory) => {
      return budgetCategory.id === id ? { ...budgetCategory, [field]: value } : budgetCategory;
    });

    const unsavedCategory = updatedCategories.find(
      (cat) => cat.id === id && cat.id > 1000 && cat.amount > 0 && cat.remaining_amount > 0
    );

    if (!unsavedCategory) {
      setBudgetCategories(updatedCategories);
      return;
    }

    await createBudgetCategory({
      amount: unsavedCategory.amount,
      budget_id: data.id,
      category_id: unsavedCategory.category_id,
      description: unsavedCategory.description || undefined,
    });
  };

  const handleUpdateBudgetCategory = (id: number) => {
    const updateCategory = budgetCategories.find((cat) => cat.id === id);
    if (!updateCategory) return;

    updateBudgetCategory(updateCategory.id, {
      amount: updateCategory.amount,
      remaining_amount: updateCategory.remaining_amount,
      description: updateCategory.description || undefined,
    });
  };

  const handleDeleteCategory = (id: number) => {
    const updatedCategories = budgetCategories.filter((category) => category.id !== id);

    if (updatedCategories.length === 0) {
      updatedCategories.push({ ...emptyExpense, id: Date.now() });
    }

    setBudgetCategories(updatedCategories);
  };

  const handleEditInitialAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setTotalBudget(value);
  };

  const availableCategories = categories
    .filter((cat) => !budgetCategories.some((bc) => bc.category_id === cat.id))
    .map((cat) => ({ label: cat.name, value: cat.id }));

  const savings = () => {
    return (
      totalBudget - budgetCategories.reduce((sum, category) => sum + Number(category.amount), 0)
    );
  };

  const canBeDeleted =
    budgetCategories.length > 1 ||
    budgetCategories[0].category_name !== "" ||
    budgetCategories[0].amount !== 0 ||
    budgetCategories[0].remaining_amount !== 0;

  return (
    <div className="bg-base-100 shadow-sm flex flex-col gap-2 rounded-md w-full justify-between">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="bg-gray-200 px-4 py-2 font-bold font-mono">{getMonthName(data.month)}</h2>
          <label
            htmlFor={budgetAmountId}
            className="bg-gray-200 px-4 py-2 grid grid-cols-2 justify-between items-center"
          >
            <span>Budget Amount</span>
            <div className="text-right">
              <input
                type="number"
                onChange={handleEditInitialAmount}
                className="focus:input h-10 text-right"
                title="Planned amount"
                placeholder="Planned amount"
                min="0"
                max={"999999"}
                maxLength={6}
                value={totalBudget}
                id={budgetAmountId}
              />
            </div>
          </label>
        </div>
        <div className="">
          {budgetCategories.map((category, index) => (
            <div key={category.id || index}>
              <Expense
                canBeDeleted={canBeDeleted}
                {...category}
                selectedCategory={{
                  label: categories.find((cat) => cat.id === category.category_id)?.name || "",
                  value: category.category_id,
                }}
                onDelete={handleDeleteCategory}
                onEdit={handleEditBudgetCategory}
                onBlur={() => handleUpdateBudgetCategory(category.id)}
                categories={availableCategories}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <button
          title="Add category"
          onClick={handleAddCategory}
          className="btn bg-gray-200 px-4 py-2 font-bold font-mono flex items-center justify-center w-full"
        >
          <PlusIcon />
        </button>
      </div>
      <label
        htmlFor={savingsId}
        className="bg-gray-200 px-4 py-2 grid grid-cols-2 justify-between items-center"
      >
        <span>Savings</span>
        <input
          type="number"
          className={`focus:input h-10 text-right ${savings() < 0 ? "text-red-500" : ""} ${
            savings() > 1000 ? "text-green-500" : ""
          }`}
          title="Savings"
          value={savings()}
          id={savingsId}
          disabled
        />
      </label>
    </div>
  );
};
