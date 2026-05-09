export interface User {
  id: string;
  name: string;
  age: number;
  job: string;
  monthlyBudget: number;
  expectedCardBill: number;
  preferredCategories: string[];
  mainCard: string;
  joinedAt: string;
}

export const users: User[] = [
  {
    id: "U001",
    name: "김기현",
    age: 29,
    job: "직장인",
    monthlyBudget: 900000,
    expectedCardBill: 762000,
    preferredCategories: ["카페", "편의점", "외식"],
    mainCard: "BC 바로카드",
    joinedAt: "2025-09-12",
  },
];

export const currentUser: User = users[0];
