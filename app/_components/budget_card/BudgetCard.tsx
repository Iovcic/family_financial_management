"use client";
import { PlusIcon } from "@/app/_icons";
import { Expense, IExpense } from "./Expense";
import { useEffect, useId, useState } from "react";

function getMonthName(monthNumber: number): string {
  // Create a new Date object. The month is zero-indexed, so subtract 1.
  // We use an arbitrary day and year as they don't affect the month name.
  const date = new Date(2000, monthNumber - 1, 1);

  // Use toLocaleString to get the month name in English (en-US locale)
  // with the 'long' format for the full month name.
  return date.toLocaleString("en-US", { month: "long" });
}
const emptyExpense: IExpense = {
  id: Date.now(),
  categoryName: "",
  plannedAmount: 0,
  remainingAmount: 0,
};

const initialCategories: IExpense[] = [emptyExpense];

export const BudgetCard = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [monthName, setMonthName] = useState("");

  const budgetAmountId = useId();
  const savingsId = useId();

  useEffect(() => {
    const getBudgets = async () => {
      const response = await fetch("http://localhost:5000/api/budgets/user/1");
      const data = await response.json();

      data.data.forEach((budget: any) => {
        setBudgetAmount(budget.total_budget);
        setMonthName(getMonthName(budget.month));

        setCategories(
          budget.category_budgets.map((catBudget: any) => ({
            id: catBudget.id,
            categoryName: catBudget.category_name,
            plannedAmount: catBudget.amount,
            remainingAmount: catBudget.remaining_amount,
          }))
        );
      });
    };

    getBudgets();
  }, []);

  const handleAddCategory = () => {
    setCategories([...categories, { ...emptyExpense, id: Date.now() }]);
  };

  const handleEditCategory = (id: number, field: keyof IExpense, value: string | number) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, [field]: value } : category
    );
    setCategories(updatedCategories);
  };

  const handleDeleteCategory = (id: number) => {
    const updatedCategories = categories.filter((category) => category.id !== id);

    if (updatedCategories.length === 0) {
      updatedCategories.push({ ...emptyExpense, id: Date.now() });
    }

    setCategories(updatedCategories);
  };

  const handleEditInitialAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBudgetAmount(value);
  };

  const savings =
    budgetAmount - categories.reduce((sum, category) => sum + category.plannedAmount, 0);

  const canBeDeleted =
    categories.length > 1 ||
    categories[0].categoryName !== "" ||
    categories[0].plannedAmount !== 0 ||
    categories[0].remainingAmount !== 0;

  console.log("sdfasd", budgetAmount);

  return (
    <div className="bg-base-100 shadow-sm flex flex-col gap-2 rounded-md w-full justify-between">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="bg-gray-200 px-4 py-2 font-bold font-mono">November</h2>
          <label
            htmlFor={budgetAmountId}
            className="bg-gray-200 px-4 py-2 grid grid-cols-2 justify-between items-center"
          >
            <span>Budget Amount</span>
            <input
              type="number"
              onChange={handleEditInitialAmount}
              className="focus:input h-10 text-right"
              title="Planned amount"
              placeholder="Planned amount"
              min="0"
              max={"999999"}
              maxLength={6}
              value={budgetAmount}
              id={budgetAmountId}
            />
          </label>
        </div>
        <div className="">
          {categories.map((category, index) => (
            <div key={category.id || index}>
              <Expense
                canBeDeleted={canBeDeleted}
                {...category}
                onDelete={handleDeleteCategory}
                onEdit={handleEditCategory}
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
          className={`focus:input h-10 text-right ${savings < 0 ? "text-red-500" : ""} ${
            savings > 1000 ? "text-green-500" : ""
          }`}
          title="Savings"
          value={savings}
          id={savingsId}
          disabled
        />
      </label>
    </div>
  );
};
