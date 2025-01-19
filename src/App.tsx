import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

// Import calculator pages
import DebtToIncomeCalculatorPage from "@/pages/tools/DebtToIncomeCalculator";
import CreditCardCalculatorPage from "@/pages/tools/CreditCardCalculator";
import DebtConsolidationCalculatorPage from "@/pages/tools/DebtConsolidationCalculator";
import EmergencyFundCalculatorPage from "@/pages/tools/EmergencyFundCalculator";
import SavingsGoalCalculatorPage from "@/pages/tools/SavingsGoalCalculator";
import BudgetCalculatorPage from "@/pages/tools/BudgetCalculator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><div>Home Page</div></MainLayout>} />
        <Route path="/about" element={<MainLayout><div>About Page</div></MainLayout>} />
        <Route path="/blog" element={<MainLayout><div>Blog Page</div></MainLayout>} />
        <Route path="/faq" element={<MainLayout><div>FAQ Page</div></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><div>Pricing Page</div></MainLayout>} />
        <Route path="/tools" element={<MainLayout><div>Tools Page</div></MainLayout>} />
        
        {/* Calculator Routes */}
        <Route path="/tools/debt-to-income-calculator" element={<DebtToIncomeCalculatorPage />} />
        <Route path="/tools/credit-card-calculator" element={<CreditCardCalculatorPage />} />
        <Route path="/tools/debt-consolidation-calculator" element={<DebtConsolidationCalculatorPage />} />
        <Route path="/tools/emergency-fund-calculator" element={<EmergencyFundCalculatorPage />} />
        <Route path="/tools/savings-goal-calculator" element={<SavingsGoalCalculatorPage />} />
        <Route path="/tools/budget-calculator" element={<BudgetCalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;