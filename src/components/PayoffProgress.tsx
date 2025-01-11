import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Info, AlertTriangle, TrendingUp, ThumbsUp, ArrowUpDown, Calendar, CircleDollarSign, MinusCircle, PercentIcon, Flame } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOneTimeFunding } from "@/hooks/use-one-time-funding";

interface PayoffProgressProps {
  totalDebt: number;
  paidAmount: number;
  currencySymbol: string;
  projectedPayoffDate?: Date;
}

export const PayoffProgress = ({ totalDebt, paidAmount, currencySymbol, projectedPayoffDate }: PayoffProgressProps) => {
  const { oneTimeFundings } = useOneTimeFunding();
  
  // Calculate total one-time funding amount
  const totalOneTimeFunding = oneTimeFundings.reduce((sum, funding) => sum + funding.amount, 0);
  
  // Add one-time funding to paid amount
  const totalPaidAmount = paidAmount + totalOneTimeFunding;
  
  // Calculate progress including one-time funding
  const progressPercentage = totalDebt > 0 ? (totalPaidAmount / (totalPaidAmount + totalDebt)) * 100 : 0;
  
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="h-full bg-white shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-[#107A57]">TOTAL DEBT BALANCE</CardTitle>
              <div className="w-12 h-12 bg-[#34D399]/10 rounded-full flex items-center justify-center">
                <CircleDollarSign className="w-6 h-6 text-[#34D399]" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Current total debt</p>
              <p className="text-2xl font-bold text-[#111827]">{formatCurrency(totalDebt)}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#34D399]/10 rounded-lg">
                    <ThumbsUp className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <span className="text-gray-600">Total Paid Off</span>
                </div>
                <span className="text-[#111827]">{formatCurrency(totalPaidAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#34D399]/10 rounded-lg">
                    <MinusCircle className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <span className="text-gray-600">Remaining Balance</span>
                </div>
                <span className="text-[#111827]">{formatCurrency(totalDebt)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#34D399]/10 rounded-lg">
                    <PercentIcon className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <span className="text-gray-600">Progress</span>
                </div>
                <span className="text-[#111827]">{progressPercentage.toFixed(1)}% Complete</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-gray-100" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};