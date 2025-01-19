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
});

export function BudgetCalculator() {
  const [result, setResult] = useState<{
    totalExpenses: number;
    discretionaryIncome: number;
    expenseBreakdown: { [key: string]: number };
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
    };

    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    const discretionaryIncome = income - totalExpenses;

    setResult({
      totalExpenses,
      discretionaryIncome,
      expenseBreakdown: expenses,
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
                      placeholder="Enter your monthly income"
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
                        placeholder="Utilities"
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
                        placeholder="Transportation"
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
                        placeholder="Food"
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
                        placeholder="Insurance"
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
                        placeholder="Savings"
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

        {result && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold">Budget Summary:</h3>
              <p className="text-2xl font-bold text-primary">
                Discretionary Income: £{result.discretionaryIncome.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Expense Breakdown:</h4>
              {Object.entries(result.expenseBreakdown).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm">
                  <span>{category}:</span>
                  <span>£{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                <span>Total Expenses:</span>
                <span>£{result.totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}