import { jsPDF } from 'jspdf';
import { Debt } from '@/lib/types';
import { formatDate } from './pdf/formatters';
import { 
  generateDebtSummaryTable, 
  generatePaymentDetailsTable,
  generateRepaymentScheduleTable
} from './pdf/tableGenerators';
import { Strategy } from '@/lib/strategies';
import { Payment } from '@/lib/types/payment';
import autoTable from 'jspdf-autotable';

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

export const generateAmortizationPDF = (
  debt: Debt,
  payoffDetails: { months: number; totalInterest: number; payoffDate: Date }
) => {
  const doc = new jsPDF();
  let currentY = 20;

  // Add title
  doc.setFontSize(24);
  doc.setTextColor(41, 37, 36);
  doc.text('Amortization Schedule', 14, currentY);

  // Add metadata
  currentY += 15;
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, currentY);
  doc.text(`Debt: ${debt.name}`, 14, currentY + 5);

  // Add debt details
  currentY += 25;
  const details = [
    ['Initial Balance', `${debt.currency_symbol}${debt.balance.toLocaleString()}`],
    ['Interest Rate', `${debt.interest_rate}%`],
    ['Monthly Payment', `${debt.currency_symbol}${debt.minimum_payment.toLocaleString()}`],
    ['Estimated Payoff Date', formatDate(payoffDetails.payoffDate)],
    ['Total Interest', `${debt.currency_symbol}${payoffDetails.totalInterest.toLocaleString()}`],
    ['Months to Payoff', payoffDetails.months.toString()]
  ];

  autoTable(doc, {
    startY: currentY,
    body: details,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150 },
      1: { cellWidth: 100 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 20;

  // Generate monthly payment schedule
  const monthlyRate = debt.interest_rate / 1200;
  let balance = debt.balance;
  let currentDate = new Date();
  const schedule = [];

  for (let month = 1; month <= payoffDetails.months && balance > 0; month++) {
    const interest = balance * monthlyRate;
    const principal = Math.min(debt.minimum_payment - interest, balance);
    balance = Math.max(0, balance - principal);

    schedule.push([
      formatDate(currentDate),
      `${debt.currency_symbol}${debt.minimum_payment.toLocaleString()}`,
      `${debt.currency_symbol}${principal.toLocaleString()}`,
      `${debt.currency_symbol}${interest.toLocaleString()}`,
      `${debt.currency_symbol}${balance.toLocaleString()}`
    ]);

    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  }

  autoTable(doc, {
    startY: currentY,
    head: [['Payment Date', 'Payment', 'Principal', 'Interest', 'Remaining Balance']],
    body: schedule,
    theme: 'striped',
    headStyles: { 
      fillColor: [41, 37, 36],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  return doc;
};

export const generatePaymentTrendsPDF = (payments: Payment[]) => {
  const doc = new jsPDF();
  let currentY = 20;

  // Add title
  doc.setFontSize(24);
  doc.setTextColor(41, 37, 36);
  doc.text('Payment Trends Report', 14, currentY);

  // Add metadata
  currentY += 15;
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, currentY);
  doc.text(`Total Payments: ${payments.length}`, 14, currentY + 5);

  // Calculate summary statistics
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const averagePayment = totalPayments / payments.length;
  const currencySymbol = payments[0]?.currency_symbol || '£';

  // Add summary section
  currentY += 25;
  const summary = [
    ['Total Payments Made', `${currencySymbol}${totalPayments.toLocaleString()}`],
    ['Average Payment', `${currencySymbol}${averagePayment.toLocaleString()}`],
    ['Number of Payments', payments.length.toString()],
    ['First Payment Date', formatDate(new Date(payments[0]?.date))],
    ['Latest Payment Date', formatDate(new Date(payments[payments.length - 1]?.date))]
  ];

  autoTable(doc, {
    startY: currentY,
    body: summary,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150 },
      1: { cellWidth: 100 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 20;

  // Add payment history table
  const paymentHistory = payments.map(payment => [
    formatDate(new Date(payment.date)),
    `${payment.currency_symbol}${payment.amount.toLocaleString()}`,
    payment.redistributedAmount ? 'Yes' : 'No',
    payment.isLastPayment ? 'Yes' : 'No'
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Payment Date', 'Amount', 'Redistributed', 'Final Payment']],
    body: paymentHistory,
    theme: 'striped',
    headStyles: { 
      fillColor: [41, 37, 36],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  return doc;
};

export const generatePayoffStrategyPDF = (
  debts: Debt[],
  allocations: Map<string, number>,
  payoffDetails: { [key: string]: any },
  totalMonthlyPayment: number,
  selectedStrategy: Strategy
) => {
  const doc = new jsPDF();
  let currentY = 20;

  // Add title and header
  doc.setFontSize(24);
  doc.setTextColor(41, 37, 36);
  doc.text('Debt Payoff Strategy Report', 14, currentY);
  
  // Add metadata
  currentY += 15;
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, currentY);
  doc.text(`Strategy: ${selectedStrategy.name}`, 14, currentY + 5);
  doc.text(`Total Monthly Payment: ${debts[0]?.currency_symbol}${totalMonthlyPayment.toLocaleString()}`, 14, currentY + 10);
  
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