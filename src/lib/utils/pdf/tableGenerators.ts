import { Debt } from '@/lib/types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatDate, formatPercentage } from './formatters';
import { generateMonthlySchedule } from './scheduleCalculator';

export const generateDebtSummaryTable = (doc: jsPDF, debts: Debt[], startY: number) => {
  const tableData = debts.map(debt => [
    debt.name,
    debt.banker_name,
    formatCurrency(debt.balance),
    formatPercentage(debt.interest_rate),
    formatCurrency(debt.minimum_payment),
    debt.next_payment_date ? formatDate(new Date(debt.next_payment_date)) : 'N/A'
  ]);

  // Add header with styling
  doc.setFontSize(16);
  doc.setTextColor(41, 37, 36);
  doc.text('Debt Summary Overview', 14, startY - 10);

  autoTable(doc, {
    startY,
    head: [['Debt Name', 'Lender', 'Balance', 'Interest Rate', 'Min Payment', 'Next Payment']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [41, 37, 36],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  return (doc as any).lastAutoTable.finalY;
};

export const generatePaymentDetailsTable = (
  doc: jsPDF, 
  debts: Debt[], 
  startY: number,
  monthlyPayment: number
) => {
  const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minimum_payment, 0);
  const avgInterestRate = debts.reduce((sum, debt) => sum + debt.interest_rate, 0) / debts.length;
  const extraPayment = monthlyPayment - totalMinPayment;

  // Add header with styling
  doc.setFontSize(16);
  doc.setTextColor(41, 37, 36);
  doc.text('Payment Overview', 14, startY - 10);

  const tableData = [
    ['Total Debt Balance', formatCurrency(totalBalance)],
    ['Monthly Payment Allocation', formatCurrency(monthlyPayment)],
    ['Total Minimum Monthly Payment', formatCurrency(totalMinPayment)],
    ['Extra Payment Available', formatCurrency(extraPayment)],
    ['Average Interest Rate', formatPercentage(avgInterestRate)],
    ['Number of Active Debts', debts.length.toString()]
  ];

  autoTable(doc, {
    startY,
    body: tableData,
    theme: 'plain',
    styles: { 
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold',
        cellWidth: 150
      },
      1: { 
        halign: 'right',
        cellWidth: 80
      }
    }
  });

  return (doc as any).lastAutoTable.finalY;
};

export const generateRepaymentScheduleTable = (
  doc: jsPDF,
  debt: Debt,
  payoffDetails: { months: number, redistributionHistory?: any[] },
  monthlyAllocation: number,
  isHighPriorityDebt: boolean,
  startY: number
) => {
  // Add debt header with styling
  doc.setFontSize(14);
  doc.setTextColor(41, 37, 36);
  doc.text(`Repayment Schedule: ${debt.name}`, 14, startY);
  startY += 6;
  
  // Add debt details with improved formatting
  doc.setFontSize(10);
  const details = [
    `Current Balance: ${formatCurrency(debt.balance)}`,
    `Interest Rate: ${formatPercentage(debt.interest_rate)}`,
    `Monthly Allocation: ${formatCurrency(monthlyAllocation)}`,
    `Priority Status: ${isHighPriorityDebt ? 'High Priority' : 'Standard Priority'}`
  ];

  details.forEach((detail, index) => {
    doc.text(detail, 14, startY + (index * 5));
  });
  startY += 25;

  // Generate monthly schedule data with improved styling
  const scheduleData = generateMonthlySchedule(
    debt,
    payoffDetails,
    monthlyAllocation,
    isHighPriorityDebt
  );

  autoTable(doc, {
    startY,
    head: [
      [
        'Payment Date',
        'Payment Amount',
        'Principal',
        'Interest',
        'Remaining Balance',
        'Redistributed Amount',
        'Has Redistribution'
      ]
    ],
    body: scheduleData,
    theme: 'striped',
    headStyles: { 
      fillColor: [41, 37, 36],
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: { 
      fontSize: 8 
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 35 },
      5: { cellWidth: 35 },
      6: { cellWidth: 25 }
    }
  });

  return (doc as any).lastAutoTable.finalY;
};