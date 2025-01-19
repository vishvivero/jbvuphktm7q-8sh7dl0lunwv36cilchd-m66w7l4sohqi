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
import { motion } from "framer-motion";

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
    const debt = parseFloat(values.monthlyDebtPayments);
    const calculatedRatio = (debt / income) * 100;
    setRatio(Number(calculatedRatio.toFixed(2)));
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
                      placeholder="Enter your monthly income"
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
              Calculate
            </Button>
          </form>
        </Form>

        {ratio !== null && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Your Debt-to-Income Ratio:</h3>
            <p className="text-2xl font-bold">{ratio}%</p>
            <div className="text-sm text-gray-600">
              {ratio < 36 ? (
                <p className="text-green-600">
                  Good! Your debt-to-income ratio is within a healthy range.
                </p>
              ) : ratio < 43 ? (
                <p className="text-yellow-600">
                  Caution: Your debt-to-income ratio is getting high.
                </p>
              ) : (
                <p className="text-red-600">
                  Warning: Your debt-to-income ratio is above recommended levels.
                </p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}