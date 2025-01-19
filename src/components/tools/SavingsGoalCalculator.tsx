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
  targetAmount: z.string().min(1, "Target amount is required"),
  timeframe: z.string().min(1, "Timeframe is required"),
  currentSavings: z.string().min(1, "Current savings is required"),
  interestRate: z.string().min(1, "Interest rate is required"),
});

export function SavingsGoalCalculator() {
  const [result, setResult] = useState<{
    monthlyContribution: number;
    totalInterest: number;
    finalAmount: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetAmount: "",
      timeframe: "",
      currentSavings: "",
      interestRate: "",
    },
  });

  function calculateSavingsGoal(values: z.infer<typeof formSchema>) {
    const target = parseFloat(values.targetAmount);
    const months = parseFloat(values.timeframe) * 12;
    const initial = parseFloat(values.currentSavings);
    const rate = parseFloat(values.interestRate) / 100 / 12;

    // Calculate required monthly contribution using compound interest formula
    const monthlyContribution =
      (target - initial * Math.pow(1 + rate, months)) /
      ((Math.pow(1 + rate, months) - 1) / rate);

    const totalContributions = monthlyContribution * months;
    const finalAmount = initial + totalContributions;
    const totalInterest = target - finalAmount;

    setResult({
      monthlyContribution: Number(monthlyContribution.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      finalAmount: Number(target.toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Savings Goal Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateSavingsGoal)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter your savings goal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeframe (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter timeframe in years"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentSavings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Savings (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter current savings"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter annual interest rate"
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

        {result && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Required Monthly Savings:</h3>
            <p className="text-2xl font-bold">
              £{result.monthlyContribution.toLocaleString()}
            </p>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>Total Interest Earned: £{result.totalInterest.toLocaleString()}</p>
              <p>Final Amount: £{result.finalAmount.toLocaleString()}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}