import { Debt, PaymentAllocation } from "../types/debt";

export const calculateExtraPayments = (
  debts: Debt[],
  initialAllocations: PaymentAllocation,
  remainingPayment: number
): PaymentAllocation => {
  console.log('Starting extra payment allocation with remaining payment:', remainingPayment);
  
  const allocations = { ...initialAllocations };
  let currentPayment = remainingPayment;
  let activeDebts = [...debts];
  let releasedPayments = 0;

  while ((currentPayment > 0 || releasedPayments > 0) && activeDebts.length > 0) {
    const currentDebt = activeDebts[0];
    const currentBalance = currentDebt.balance;
    const currentAllocation = allocations[currentDebt.id];
    const remainingDebtBalance = currentBalance - currentAllocation;

    console.log(`Processing debt ${currentDebt.name}:`, {
      currentBalance,
      currentAllocation,
      remainingBalance: remainingDebtBalance,
      availablePayment: currentPayment,
      releasedPayments
    });

    if (remainingDebtBalance <= 0) {
      console.log(`${currentDebt.name} is already paid off, moving to next debt`);
      activeDebts = activeDebts.slice(1);
      continue;
    }

    // Combine current and released payments
    const totalAvailable = currentPayment + releasedPayments;
    releasedPayments = 0; // Reset after combining

    // Calculate and apply extra payment
    const extraPayment = Math.min(totalAvailable, remainingDebtBalance);
    allocations[currentDebt.id] += extraPayment;
    currentPayment = Math.max(0, totalAvailable - extraPayment);

    console.log(`Added ${extraPayment} to ${currentDebt.name}, remaining payment: ${currentPayment}`);

    // Handle paid off debt
    if (allocations[currentDebt.id] >= currentBalance) {
      console.log(`${currentDebt.name} is now fully paid off`);
      if (activeDebts.length > 1) {
        // Release minimum payment for next debt
        releasedPayments += Math.min(currentDebt.minimumPayment, currentBalance);
        console.log(`Released payment for reallocation: ${releasedPayments}`);
      }
      activeDebts = activeDebts.slice(1);
    }
  }

  return allocations;
};