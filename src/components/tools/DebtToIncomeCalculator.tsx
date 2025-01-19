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
  monthlyDebtPayments: z.string().min(1, "Monthly debt payments are required"),
});

export function DebtToIncomeCalculator() {
  const [ratio, setRatio] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: "",
      monthlyDebtPayments: "",
    },
  });

  function calculateRatio(values: z.infer<typeof formSchema>) {
    const income = parseFloat(values.monthlyIncome);
    const debtPayments = parseFloat(values.monthlyDebtPayments);
    const dtiRatio = (debtPayments / income) * 100;
    setRatio(Number(dtiRatio.toFixed(2)));
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Debt-to-Income Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateRatio)}
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

            <FormField
              control={form.control}
              name="monthlyDebtPayments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Debt Payments (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter total monthly debt payments"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Calculate Ratio
            </Button>
          </form>
        </Form>

        {ratio !== null && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Your Debt-to-Income Ratio:</h3>
            <p>{ratio}%</p>
            <div className="text-sm text-gray-600 mt-2">
              <p>General guidelines:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Below 36%: Healthy debt load</li>
                <li>36-42%: Opportunity to improve</li>
                <li>43-49%: Financial strain likely</li>
                <li>Above 50%: Financial hardship</li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}