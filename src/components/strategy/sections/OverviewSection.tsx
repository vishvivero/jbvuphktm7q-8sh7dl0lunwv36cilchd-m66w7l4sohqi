import { formatCurrency } from "@/lib/strategies";

interface OverviewSectionProps {
  totalSavings: number;
  interestSaved: number;
  monthsSaved: number;
  currencySymbol: string;
}

export const OverviewSection = ({ 
  totalSavings, 
  interestSaved, 
  monthsSaved,
  currencySymbol 
}: OverviewSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Total Extra Payments</span>
        <span className="font-semibold text-primary">
          {totalSavings > 0 ? formatCurrency(totalSavings, currencySymbol) : `${currencySymbol}0.00`}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Interest Saved</span>
        <span className="font-semibold text-green-600">
          {interestSaved > 0 ? formatCurrency(interestSaved, currencySymbol) : `${currencySymbol}0.00`}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Time Saved</span>
        <span className="font-semibold text-blue-600">
          {monthsSaved > 0 ? `${monthsSaved} months` : '0 months'}
        </span>
      </div>
    </div>
  );
};