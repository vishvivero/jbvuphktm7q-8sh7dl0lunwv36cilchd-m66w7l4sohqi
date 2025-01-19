import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  housing: z.string().min(1, "Housing expense is required"),
  utilities: z.string().min(1, "Utilities expense is required"),
  transportation: z.string().min(1, "Transportation expense is required"),
  food: z.string().min(1, "Food expense is required"),
  insurance: z.string().min(1, "Insurance expense is required"),
  savings: z.string().min(1, "Savings amount is required"),
  entertainment: z.string().min(1, "Entertainment expense is required"),
  other: z.string().min(1, "Other expenses are required"),
});

export function BudgetPlanningCalculator() {
  const [budget, setBudget] = useState<{
    totalExpenses: number;
    surplus: number;
    categories: { name: string; amount: number; percentage: number }[];
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: "",
      housing: "",
      utilities: "",
      transportation: "",
      food: "",
      insurance: "",
      savings: "",
      entertainment: "",
      other: "",
    },
  });

  function calculateBudget(values: z.infer<typeof formSchema>) {
    const income = parseFloat(values.monthlyIncome);
    const expenses = {
      Housing: parseFloat(values.housing),
      Utilities: parseFloat(values.utilities),
      Transportation: parseFloat(values.transportation),
      Food: parseFloat(values.food),
      Insurance: parseFloat(values.insurance),
      Savings: parseFloat(values.savings),
      Entertainment: parseFloat(values.entertainment),
      Other: parseFloat(values.other),
    };

    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
    const surplus = income - totalExpenses;

    const categories = Object.entries(expenses).map(([name, amount]) => ({
      name,
      amount,
      percentage: Number(((amount / income) * 100).toFixed(1)),
    }));

    setBudget({
      totalExpenses,
      surplus,
      categories,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Budget Planning Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateBudget)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter monthly income"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="housing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Housing (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Rent/Mortgage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="utilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utilities (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Electric, Gas, Water"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transportation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transportation (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Car, Public Transport"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Groceries, Dining"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Health, Life, Car"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="savings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Savings (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Emergency Fund, Goals"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entertainment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entertainment (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Recreation, Hobbies"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other (£)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Miscellaneous Expenses"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Calculate Budget
            </Button>
          </form>
        </Form>

        {budget && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-4">
            <h3 className="font-semibold">Budget Breakdown:</h3>
            <div className="space-y-2">
              {budget.categories.map((category) => (
                <div key={category.name} className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <div className="text-right">
                    <span className="font-medium">£{category.amount.toLocaleString()}</span>
                    <span className="text-gray-600 text-sm ml-2">({category.percentage}%)</span>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Expenses</span>
                  <span>£{budget.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <span>Monthly Surplus</span>
                  <span className={budget.surplus >= 0 ? "text-green-600" : "text-red-600"}>
                    £{budget.surplus.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}