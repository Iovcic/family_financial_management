"use client";
import { MinusIcon, XIcon } from "@/app/_icons";
import { IBECategoryBudgetDetail } from "@/app/_types/be_types";
import { useState } from "react";
import { SingleValue } from "react-select";
import SelectCreatable from "react-select/creatable";

interface IExpenseProps extends IBECategoryBudgetDetail {
  onEdit: (id: number, field: keyof IBECategoryBudgetDetail, value: number | string) => void;
  onBlur: () => void;
  onDelete: (id: number) => void;
  canBeDeleted?: boolean;
  selectedCategory: SingleValue<{ label: string; value: number }>;
  categories?: { label: string; value: number }[];
}

export const Expense = ({
  id,
  selectedCategory,
  amount,
  remaining_amount,
  onDelete,
  onEdit,
  onBlur,
  canBeDeleted = true,
  categories = [],
}: IExpenseProps) => {
  const [subtractAmount, setSubtractAmount] = useState(0);

  const handleEditcategory_name = (
    categoryOption: SingleValue<{ label: string; value: number } | undefined>
  ) => {
    if (!categoryOption) return;
    onEdit(id, "category_name", categoryOption.label);
    onEdit(id, "category_id", Number(categoryOption.value));
  };

  const handleEditInitialAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onEdit(id, "amount", value);
  };

  const handleEditremaining_amount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onEdit(id, "remaining_amount", value);
  };

  const handleDeleteCategory = () => {
    onDelete(id);
  };

  const handleSubtractAmount = () => {
    const newremaining_amount = Math.max(0, remaining_amount - subtractAmount);
    onEdit(id, "remaining_amount", newremaining_amount);
    setSubtractAmount(0);
    document.getElementById("my_modal_3")?.close();
  };

  const handleChangeSubtractAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSubtractAmount(value);
  };

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto]">
      <SelectCreatable
        defaultValue={selectedCategory || null}
        onChange={handleEditcategory_name}
        options={categories}
      />
      <input
        type="number"
        onChange={handleEditInitialAmount}
        className="input"
        title="Planned amount"
        placeholder="Planned amount"
        min="0"
        max={"99999"}
        maxLength={5}
        value={amount}
        onBlur={onBlur}
      />
      <input
        type="number"
        onChange={handleEditremaining_amount}
        className={`input ${
          remaining_amount > amount || remaining_amount < 0 ? "input-error" : ""
        }`}
        title="Remaining amount"
        placeholder="Remaining amount"
        min="0"
        max={"99999"}
        maxLength={5}
        value={remaining_amount}
        onBlur={onBlur}
      />
      <div className="flex justify-end min-w-20">
        {remaining_amount > 0 && amount >= remaining_amount && (
          <button
            title="Subtract"
            onClick={() => document.getElementById("my_modal_3")?.showModal()}
            className="btn btn-square btn-outline border-0 text-blue-500"
          >
            <MinusIcon />
          </button>
        )}
        {canBeDeleted && (
          <button
            title="Remove category"
            onClick={handleDeleteCategory}
            className="btn btn-square btn-outline border-0 text-red-500"
          >
            <XIcon />
          </button>
        )}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Subtract Amount from the remaining amount</h3>
          <div className="text-right">
            <input
              type="number"
              onChange={handleChangeSubtractAmount}
              className={`input ${remaining_amount - subtractAmount < 0 ? "input-error" : ""}`}
              title="Planned amount"
              placeholder="Planned amount"
              min="0"
              max={"99999"}
              maxLength={5}
              value={subtractAmount}
            />
            {remaining_amount - subtractAmount < 0 && (
              <p className="text-red-500 text-sm mt-1">
                Cannot subtract more than remaining amount
              </p>
            )}
          </div>
          <div className="modal-action gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => document.getElementById("my_modal_3")?.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={remaining_amount - subtractAmount < 0}
              onClick={handleSubtractAmount}
              className="btn btn-primary"
            >
              Subtract
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
