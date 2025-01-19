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
  currentDebts: z.string().min(1, "Current total debts is required"),
  averageInterestRate: z.string().min(1, "Average interest rate is required"),
  consolidationRate: z.string().min(1, "Consolidation loan rate is required"),
  loanTerm: z.string().min(1, "Loan term is required"),
});

export function DebtConsolidationCalculator() {
  const [comparison, setComparison] = useState<{
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    totalCurrentCost: number;
    totalNewCost: number;
    savings: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentDebts: "",
      averageInterestRate: "",
      consolidationRate: "",
      loanTerm: "",
    },
  });

  function calculateComparison(values: z.infer<typeof formSchema>) {
    const principal = parseFloat(values.currentDebts);
    const currentRate = parseFloat(values.averageInterestRate) / 100;
    const newRate = parseFloat(values.consolidationRate) / 100;
    const years = parseFloat(values.loanTerm);
    const months = years * 12;

    // Calculate current scenario
    const currentMonthlyRate = currentRate / 12;
    const currentMonthlyPayment = (principal * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, months)) / (Math.pow(1 + currentMonthlyRate, months) - 1);
    const totalCurrentCost = currentMonthlyPayment * months;

    // Calculate consolidation scenario
    const newMonthlyRate = newRate / 12;
    const newMonthlyPayment = (principal * newMonthlyRate * Math.pow(1 + newMonthlyRate, months)) / (Math.pow(1 + newMonthlyRate, months) - 1);
    const totalNewCost = newMonthlyPayment * months;

    setComparison({
      currentMonthlyPayment: Number(currentMonthlyPayment.toFixed(2)),
      newMonthlyPayment: Number(newMonthlyPayment.toFixed(2)),
      totalCurrentCost: Number(totalCurrentCost.toFixed(2)),
      totalNewCost: Number(totalNewCost.toFixed(2)),
      savings: Number((totalCurrentCost - totalNewCost).toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Debt Consolidation Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateComparison)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="currentDebts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Current Debts (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter total current debts"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="averageInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Current Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter average current interest rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consolidationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consolidation Loan Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter consolidation loan rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      placeholder="Enter loan term in years"
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

        {comparison && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Comparison Summary:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Current Scenario:</p>
                <p>Monthly Payment: £{comparison.currentMonthlyPayment.toLocaleString()}</p>
                <p>Total Cost: £{comparison.totalCurrentCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Consolidation Scenario:</p>
                <p>Monthly Payment: £{comparison.newMonthlyPayment.toLocaleString()}</p>
                <p>Total Cost: £{comparison.totalNewCost.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-bold text-lg">
                Total Savings: £{comparison.savings.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}