import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import BlogPage from "@/pages/Blog";
import FAQPage from "@/pages/FAQ";
import PricingPage from "@/pages/Pricing";
import ToolsPage from "@/pages/FreeTools";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        
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
