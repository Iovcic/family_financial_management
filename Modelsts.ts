enum EExpenseType {
    expense = "expense",
    loan = "loan",
}

enum ELoanType {
    bankLoan = "bankLoan",
    personLoan = "personLoan"
}

interface IUser {
    id: number;
    email: string;
    name?: string;
    password: string; // hash
}

interface IBudget {
    id: number;
    userId: number;
    year: number;
    month: number;
    amount: number;
}

interface IBudgetCategory {
    id: number;
    budgetId: number;
    categoryId: number;
    amount: number;
    description?: string;
}

interface IBudgetLoan {
    id: number;
    budgetId: number;
    loanId: number;
    amount: number;
    description?: string;
}

interface IExpense {
    id: number;
    budgetId: number;
    categoryId?: number;
    loanId?: number;
    amount: number;
    type: EExpenseType;
}

interface ILoan {
    userId: number;
    name: string;
    amount: number;
    loanType: ELoanType;
    startMonth: number;
    endMonth: number;
}