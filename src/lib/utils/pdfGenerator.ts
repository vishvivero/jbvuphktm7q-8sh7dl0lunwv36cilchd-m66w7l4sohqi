import { jsPDF } from 'jspdf';
import { Debt } from '@/lib/types';
import { formatDate } from './pdf/formatters';
import { 
  generateDebtSummaryTable, 
  generatePaymentDetailsTable,
  generateRepaymentScheduleTable
} from './pdf/tableGenerators';
import { Strategy } from '@/lib/strategies';

export const generateDebtOverviewPDF = (
  debts: Debt[],
  allocations: Map<string, number>,
  payoffDetails: { [key: string]: { months: number, redistributionHistory?: any[] } },
  totalMonthlyPayment: number,
  selectedStrategy: Strategy
) => {
  console.log('Generating PDF with:', {
    numberOfDebts: debts.length,
    totalMonthlyPayment,
    strategy: selectedStrategy.name,
    allocations: Array.from(allocations.entries())
  });

  const doc = new jsPDF();
  let currentY = 20;

  // Add title and header
  doc.setFontSize(24);
  doc.setTextColor(41, 37, 36);
  doc.text('Debt Overview Report', 14, currentY);
  
  // Add metadata
  currentY += 15;
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, currentY);
  doc.text(`Strategy: ${selectedStrategy.name}`, 14, currentY + 5);
  
  // Add debt summary section
  currentY += 25;
  currentY = generateDebtSummaryTable(doc, debts, currentY);

  // Add payment details section
  currentY += 20;
  currentY = generatePaymentDetailsTable(doc, debts, currentY, totalMonthlyPayment);

  // Add individual repayment schedules
  debts.forEach((debt, index) => {
    doc.addPage();
    currentY = 20;
    
    const monthlyAllocation = allocations.get(debt.id) || debt.minimum_payment;
    const details = payoffDetails[debt.id];
    const isHighPriorityDebt = index === 0;

    console.log(`Generating repayment schedule for ${debt.name}:`, {
      monthlyAllocation,
      months: details?.months,
      hasRedistributions: details?.redistributionHistory?.length > 0,
      isHighPriorityDebt
    });

    currentY = generateRepaymentScheduleTable(
      doc,
      debt,
      details,
      monthlyAllocation,
      isHighPriorityDebt,
      currentY
    );
  });

  return doc;
};
