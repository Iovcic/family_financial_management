enum EExpenseType {
    expense = "expense",
    loan = "loan",
}

enum ELoanType {
    bankLoan = "bankLoan",
    personLoan = "personLoan"
}

enum EMemberRole {
    owner = "owner",
    member = "member"
}

enum EUserRole {
    admin = "admin",
    user = "user"
}

interface IUser {
    id: number;
    email: string;
    name?: string;
    password: string; // hash
    role: EUserRole;
    token_version: number;
}

interface IBudget {
    id: number;
    user_id: number;
    name: string;
}

interface IBudgetYear {
    id: number;
    budget_id: number;
    year: number;
}

interface IBudgetMonth {
    id: number;
    budget_year_id: number;
    month: number;
    amount: number;
}

interface IBudgetCategory {
    id: number;
    budget_month_id: number;
    category_id: number;
    amount: number;
    description?: string;
}

interface IBudgetMonthLoan {
    id: number;
    budget_month_id: number;
    loan_id: number;
    amount: number;
    description?: string;
}

interface IExpense {
    id: number;
    budget_month_id: number;
    category_id?: number;
    loan_id?: number;
    amount: number;
    type: EExpenseType;
}

interface ILoan {
    id: number;
    budget_id: number;
    name: string;
    amount: number;
    loan_type: ELoanType;
    start_month: number;
    end_month: number;
    contract_number?: string;
    description?: string;
}

interface IBudgetMembers {
    id: number;
    budget_id: number;
    user_id: number;
    role: EMemberRole;
}