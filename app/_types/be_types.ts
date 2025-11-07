export interface IBEBudget {
    id: number;
    user_id: number;
    month: number;
    year: number;
    total_budget: number;
    created_at: Date;
    updated_at: Date;
}

export interface IBECategoryBudgetDetail {
    id: number;
    category_id: number;
    category_name: string;
    amount: number;
    remaining_amount: number;
    description: string | null;
}

export interface IBEBudgetWithCategories extends IBEBudget {
    category_budgets: IBECategoryBudgetDetail[];
    total_allocated: number;
}

export interface IBECreateBudgetDTO {
    user_id: number;
    month: number;
    year: number;
    total_budget: number;
}

export interface IBEUpdateBudgetDTO {
    total_budget?: number;
}

export interface IBECategory {
    id: number;
    user_id: number;
    name: string;
    created_at: Date;
}

export interface IBECreateCategoryBudgetDTO {
    budget_id: number;
    category_id: number;
    amount: number;
    description?: string;
}

export interface IBEUpdateCategoryBudgetDTO {
    amount?: number;
    remaining_amount?: number;
    description?: string;
}