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
  balance: z.string().min(1, "Balance is required"),
  interestRate: z.string().min(1, "Interest rate is required"),
  monthlyPayment: z.string().min(1, "Monthly payment is required"),
});

export function CreditCardCalculator() {
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: "",
      interestRate: "",
      monthlyPayment: "",
    },
  });

  function calculatePayoff(values: z.infer<typeof formSchema>) {
    const balance = parseFloat(values.balance);
    const annualRate = parseFloat(values.interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const payment = parseFloat(values.monthlyPayment);

    let remainingBalance = balance;
    let months = 0;
    let totalInterest = 0;

    while (remainingBalance > 0 && months < 1200) {
      const monthlyInterest = remainingBalance * monthlyRate;
      totalInterest += monthlyInterest;

      if (payment <= monthlyInterest) {
        setResult(null);
        return;
      }

      remainingBalance = remainingBalance + monthlyInterest - payment;
      months++;
    }

    setResult({
      monthsToPayoff: months,
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPayment: Number((balance + totalInterest).toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Credit Card Payoff Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculatePayoff)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Card Balance (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter your credit card balance"
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

            <FormField
              control={form.control}
              name="monthlyPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Payment (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter monthly payment amount"
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
            <h3 className="font-semibold">Payoff Summary:</h3>
            <p>Months to Pay Off: {result.monthsToPayoff}</p>
            <p>Total Interest: £{result.totalInterest.toLocaleString()}</p>
            <p>Total Payment: £{result.totalPayment.toLocaleString()}</p>
          </div>
        )}
      </Card>
    </div>
  );
}