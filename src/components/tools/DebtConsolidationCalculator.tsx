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
  currentDebts: z.array(
    z.object({
      balance: z.string().min(1, "Balance is required"),
      interestRate: z.string().min(1, "Interest rate is required"),
    })
  ).min(1),
  consolidationRate: z.string().min(1, "Consolidation rate is required"),
  loanTerm: z.string().min(1, "Loan term is required"),
});

export function DebtConsolidationCalculator() {
  const [debts, setDebts] = useState([{ balance: "", interestRate: "" }]);
  const [comparison, setComparison] = useState<{
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    totalSavings: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentDebts: [{ balance: "", interestRate: "" }],
      consolidationRate: "",
      loanTerm: "",
    },
  });

  const addDebt = () => {
    setDebts([...debts, { balance: "", interestRate: "" }]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) {
      const newDebts = [...debts];
      newDebts.splice(index, 1);
      setDebts(newDebts);
    }
  };

  function calculateConsolidation(values: z.infer<typeof formSchema>) {
    const totalBalance = values.currentDebts.reduce(
      (sum, debt) => sum + parseFloat(debt.balance),
      0
    );
    
    const weightedRate = values.currentDebts.reduce(
      (sum, debt) => 
        sum + (parseFloat(debt.balance) / totalBalance) * parseFloat(debt.interestRate),
      0
    );
    
    const consolidationRate = parseFloat(values.consolidationRate);
    const loanTermMonths = parseFloat(values.loanTerm) * 12;
    
    // Calculate current total monthly payment
    const currentMonthlyPayment = values.currentDebts.reduce((sum, debt) => {
      const monthlyRate = parseFloat(debt.interestRate) / 1200;
      const balance = parseFloat(debt.balance);
      return sum + (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -60)); // Assuming 5-year term for current debts
    }, 0);
    
    // Calculate new consolidated monthly payment
    const monthlyRate = consolidationRate / 1200;
    const newMonthlyPayment = 
      (totalBalance * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    
    const totalCurrentPayments = currentMonthlyPayment * 60; // Assuming 5-year term for current debts
    const totalNewPayments = newMonthlyPayment * loanTermMonths;
    const totalSavings = totalCurrentPayments - totalNewPayments;

    setComparison({
      currentMonthlyPayment: Number(currentMonthlyPayment.toFixed(2)),
      newMonthlyPayment: Number(newMonthlyPayment.toFixed(2)),
      totalSavings: Number(totalSavings.toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Debt Consolidation Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateConsolidation)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Debts</h3>
              {debts.map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`currentDebts.${index}.balance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Debt {index + 1} Balance (£)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter debt balance"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`currentDebts.${index}.interestRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
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

                  {debts.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeDebt(index)}
                      className="mt-2"
                    >
                      Remove Debt
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addDebt}
                className="w-full"
              >
                Add Another Debt
              </Button>
            </div>

            <FormField
              control={form.control}
              name="consolidationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consolidation Loan Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
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
              Calculate Savings
            </Button>
          </form>
        </Form>

        {comparison && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Comparison Results:</h3>
            <p>Current Monthly Payment: £{comparison.currentMonthlyPayment.toLocaleString()}</p>
            <p>New Monthly Payment: £{comparison.newMonthlyPayment.toLocaleString()}</p>
            <p>Total Savings: £{comparison.totalSavings.toLocaleString()}</p>
          </div>
        )}
      </Card>
    </div>
  );
}