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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  targetAmount: z.string().min(1, "Target amount is required"),
  timeframe: z.string().min(1, "Timeframe is required"),
  initialDeposit: z.string(),
  interestRate: z.string(),
  contributionFrequency: z.string(),
});

export function SavingsGoalCalculator() {
  const [result, setResult] = useState<{
    regularContribution: number;
    totalContributions: number;
    totalInterest: number;
    finalBalance: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetAmount: "",
      timeframe: "",
      initialDeposit: "0",
      interestRate: "0",
      contributionFrequency: "monthly",
    },
  });

  function calculateSavings(values: z.infer<typeof formSchema>) {
    const target = parseFloat(values.targetAmount);
    const months = parseFloat(values.timeframe);
    const initial = parseFloat(values.initialDeposit) || 0;
    const annualRate = parseFloat(values.interestRate) || 0;
    const frequency = values.contributionFrequency;

    const periodsPerYear = frequency === "monthly" ? 12 : frequency === "weekly" ? 52 : 26;
    const totalPeriods = (months / 12) * periodsPerYear;
    const ratePerPeriod = annualRate / (100 * periodsPerYear);

    // Calculate required periodic contribution using future value formula
    const futureValue = target;
    const presentValue = initial;
    
    let regularContribution;
    if (ratePerPeriod === 0) {
      regularContribution = (futureValue - presentValue) / totalPeriods;
    } else {
      regularContribution = 
        (futureValue - presentValue * Math.pow(1 + ratePerPeriod, totalPeriods)) /
        ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    }

    const totalContributions = regularContribution * totalPeriods + initial;
    const totalInterest = target - totalContributions;

    setResult({
      regularContribution: Number(regularContribution.toFixed(2)),
      totalContributions: Number(totalContributions.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      finalBalance: target,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Savings Goal Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateSavings)}
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
                      placeholder="Enter target amount"
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
                  <FormLabel>Timeframe (Months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      placeholder="Enter number of months"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Deposit (£) (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter initial deposit"
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
                  <FormLabel>Annual Interest Rate (%) (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter interest rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contributionFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contribution Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select contribution frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Calculate Plan
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Savings Plan:</h3>
            <p>Regular Contribution: £{result.regularContribution.toLocaleString()}</p>
            <p>Total Contributions: £{result.totalContributions.toLocaleString()}</p>
            <p>Total Interest Earned: £{result.totalInterest.toLocaleString()}</p>
            <p>Final Balance: £{result.finalBalance.toLocaleString()}</p>
          </div>
        )}
      </Card>
    </div>
  );
}