import { IBEBudgetWithCategories, IBECategory, IBECategoryBudgetDetail, IBECreateCategoryBudgetDTO, IBEUpdateBudgetDTO, IBEUpdateCategoryBudgetDTO } from "@/app/_types/be_types";
import { fetchData } from "..";

export const getUserBudgets = fetchData<IBEBudgetWithCategories[]>("/budgets/user/1", {
    method: "GET",
});

export const createCategory = async () => {
    const res = await fetchData<IBECategory>("/categories", { method: "POST" });

    return res;
}

export const getUserCategoriesAsync = async () => {
    const res = await fetchData<IBECategory[]>("/categories/user/1", {
        method: "GET"
    });

    console.log('asdfas', res.map(r => ({
        label: r.name,
        value: r.id
    })))

    return res.map(r => ({
        label: r.name,
        value: r.id
    }))
}

export const createBudgetCategory = async (budgetCategory: IBECreateCategoryBudgetDTO) => {
    const res = await fetchData<IBECategoryBudgetDetail>("/category-budgets", {
        method: "POST",
        body: JSON.stringify(budgetCategory)
    });

    return res;
}

export const updateBudgetCategory = async (id: number, payload: IBEUpdateCategoryBudgetDTO) => {
    const res = await fetchData<IBECategoryBudgetDetail>("/category-budgets/" + id, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

    return res;
}