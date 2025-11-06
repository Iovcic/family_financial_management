import { MinusIcon, XIcon } from "@/app/_icons";
import { use, useState } from "react";

export interface IExpense {
  id: number;
  categoryName: string;
  plannedAmount: number;
  remainingAmount: number;
}

interface IExpenseProps extends IExpense {
  onEdit: (id: number, field: keyof IExpense, value: string | number) => void;
  onDelete: (id: number) => void;
  canBeDeleted?: boolean;
}

export const Expense = ({
  id,
  categoryName,
  plannedAmount,
  remainingAmount,
  onDelete,
  onEdit,
  canBeDeleted = true,
}: IExpenseProps) => {
  const [subtractAmount, setSubtractAmount] = useState(0);

  const handleEditCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(id, "categoryName", e.target.value);
  };

  const handleEditInitialAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onEdit(id, "plannedAmount", value);
  };

  const handleEditRemainingAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onEdit(id, "remainingAmount", value);
  };

  const handleDeleteCategory = () => {
    onDelete(id);
  };

  const handleSubtractAmount = () => {
    const newRemainingAmount = Math.max(0, remainingAmount - subtractAmount);
    onEdit(id, "remainingAmount", newRemainingAmount);
    setSubtractAmount(0);
    document.getElementById("my_modal_3")?.close();
  };

  const handleChangeSubtractAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSubtractAmount(value);
  };

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto]">
      <input
        value={categoryName}
        onChange={handleEditCategoryName}
        type="text"
        className="input"
        placeholder="Category name"
        title="Category name"
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
        value={plannedAmount}
      />
      <input
        type="number"
        onChange={handleEditRemainingAmount}
        className={`input ${
          remainingAmount > plannedAmount || remainingAmount < 0 ? "input-error" : ""
        }`}
        title="Remaining amount"
        placeholder="Remaining amount"
        min="0"
        max={"99999"}
        maxLength={5}
        value={remainingAmount}
      />
      <div className="flex justify-end min-w-20">
        {remainingAmount > 0 && plannedAmount >= remainingAmount && (
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
              className={`input ${remainingAmount - subtractAmount < 0 ? "input-error" : ""}`}
              title="Planned amount"
              placeholder="Planned amount"
              min="0"
              max={"99999"}
              maxLength={5}
              value={subtractAmount}
            />
            {remainingAmount - subtractAmount < 0 && (
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
              disabled={remainingAmount - subtractAmount < 0}
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
