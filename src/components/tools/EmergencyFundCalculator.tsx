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
  monthlyExpenses: z.string().min(1, "Monthly expenses are required"),
  riskLevel: z.string(),
  employmentType: z.string(),
  dependents: z.string(),
});

export function EmergencyFundCalculator() {
  const [recommendation, setRecommendation] = useState<{
    monthsRecommended: number;
    totalAmount: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyExpenses: "",
      riskLevel: "moderate",
      employmentType: "fullTime",
      dependents: "0",
    },
  });

  function calculateRecommendation(values: z.infer<typeof formSchema>) {
    const monthlyExpenses = parseFloat(values.monthlyExpenses);
    let baseMonths = 3;

    // Adjust for risk level
    switch (values.riskLevel) {
      case "conservative":
        baseMonths += 3;
        break;
      case "aggressive":
        baseMonths -= 1;
        break;
    }

    // Adjust for employment type
    switch (values.employmentType) {
      case "selfEmployed":
        baseMonths += 3;
        break;
      case "contract":
        baseMonths += 2;
        break;
      case "partTime":
        baseMonths += 1;
        break;
    }

    // Adjust for dependents
    const dependents = parseInt(values.dependents);
    baseMonths += Math.min(dependents, 3);

    setRecommendation({
      monthsRecommended: baseMonths,
      totalAmount: Number((monthlyExpenses * baseMonths).toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Emergency Fund Calculator</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(calculateRecommendation)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses (£)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter monthly expenses"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riskLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="fullTime">Full-Time</SelectItem>
                      <SelectItem value="partTime">Part-Time</SelectItem>
                      <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dependents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Dependents</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select number of dependents" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Calculate Recommendation
            </Button>
          </form>
        </Form>

        {recommendation && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg space-y-2">
            <h3 className="font-semibold">Recommended Emergency Fund:</h3>
            <p>Months of Expenses: {recommendation.monthsRecommended}</p>
            <p>Total Amount: £{recommendation.totalAmount.toLocaleString()}</p>
            <div className="text-sm text-gray-600 mt-2">
              <p>This recommendation is based on:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Your monthly expenses</li>
                <li>Risk tolerance level</li>
                <li>Employment situation</li>
                <li>Number of dependents</li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}