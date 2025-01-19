import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Debt } from "@/lib/types/debt";

interface DebtOverviewChartProps {
  debts: Debt[];
}

export const DebtOverviewChart = ({ debts }: DebtOverviewChartProps) => {
  // Sort debts by balance in descending order
  const debtData = [...debts]
    .sort((a, b) => b.balance - a.balance)
    .map(debt => ({
      name: debt.name,
      balance: Number(debt.balance),
      interestRate: Number(debt.interest_rate),
    }));

  console.log('Sorted debt data for chart:', debtData);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={debtData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="balance" 
            fill="#34D399" 
            name="Balance" 
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="interestRate"
            stroke="#818CF8"
            name="Interest Rate %"
            dot
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};