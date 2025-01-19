import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";

interface LoanOption {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export const LoanComparisonCalculator = () => {
  const [currency, setCurrency] = useState("£");
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([
    {
      loanAmount: "",
      interestRate: "",
      loanTerm: "",
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0
    },
    {
      loanAmount: "",
      interestRate: "",
      loanTerm: "",
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0
    }
  ]);

  const calculateLoanDetails = (
    loanAmount: number,
    annualRate: number,
    years: number
  ) => {
    const monthlyRate = annualRate / 1200;
    const months = years * 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment,
      totalInterest,
      totalPayment
    };
  };

  const handleCalculate = () => {
    const updatedOptions = loanOptions.map(option => {
      if (!option.loanAmount || !option.interestRate || !option.loanTerm) {
        return option;
      }

      const { monthlyPayment, totalInterest, totalPayment } = calculateLoanDetails(
        parseFloat(option.loanAmount),
        parseFloat(option.interestRate),
        parseFloat(option.loanTerm)
      );

      return {
        ...option,
        monthlyPayment,
        totalInterest,
        totalPayment
      };
    });

    setLoanOptions(updatedOptions);
  };

  const handleInputChange = (index: number, field: keyof LoanOption, value: string) => {
    const newOptions = [...loanOptions];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    setLoanOptions(newOptions);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency === '£' ? 'GBP' : currency === '€' ? 'EUR' : 'USD'
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6" />
            Loan Comparison Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="mb-4">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="£">GBP (£)</SelectItem>
                <SelectItem value="$">USD ($)</SelectItem>
                <SelectItem value="€">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loanOptions.map((option, index) => (
              <Card key={index} className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">Loan Option {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Loan Amount</Label>
                    <Input
                      type="number"
                      value={option.loanAmount}
                      onChange={(e) => handleInputChange(index, 'loanAmount', e.target.value)}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Interest Rate (%)</Label>
                    <Input
                      type="number"
                      value={option.interestRate}
                      onChange={(e) => handleInputChange(index, 'interestRate', e.target.value)}
                      placeholder="Enter interest rate"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Loan Term (Years)</Label>
                    <Input
                      type="number"
                      value={option.loanTerm}
                      onChange={(e) => handleInputChange(index, 'loanTerm', e.target.value)}
                      placeholder="Enter loan term"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleCalculate}
              disabled={loanOptions.some(
                option => !option.loanAmount || !option.interestRate || !option.loanTerm
              )}
              className="w-full md:w-auto"
            >
              Compare Loans
            </Button>
          </div>

          {loanOptions.some(option => option.monthlyPayment > 0) && (
            <Table className="mt-8">
              <TableHeader>
                <TableRow>
                  <TableHead>Comparison</TableHead>
                  <TableHead>Loan Option 1</TableHead>
                  <TableHead>Loan Option 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Monthly Payment</TableCell>
                  <TableCell>{formatCurrency(loanOptions[0].monthlyPayment)}</TableCell>
                  <TableCell>{formatCurrency(loanOptions[1].monthlyPayment)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest</TableCell>
                  <TableCell>{formatCurrency(loanOptions[0].totalInterest)}</TableCell>
                  <TableCell>{formatCurrency(loanOptions[1].totalInterest)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Payment</TableCell>
                  <TableCell>{formatCurrency(loanOptions[0].totalPayment)}</TableCell>
                  <TableCell>{formatCurrency(loanOptions[1].totalPayment)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
