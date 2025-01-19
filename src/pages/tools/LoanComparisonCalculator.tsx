import { LoanComparisonCalculator } from "@/components/tools/LoanComparisonCalculator";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoanComparisonCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                Loan Comparison Calculator
              </h1>
              <p className="text-gray-600 text-lg">
                Compare different loan options to find the best rates and terms for you.
              </p>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <LoanComparisonCalculator />
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About</h4>
              <p className="text-gray-600">
                Compare loan options and make informed financial decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/tools" className="hover:text-[#9b87f5] transition-colors">
                    All Calculators
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-[#9b87f5] transition-colors">
                    Financial Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <LegalFooter />
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
};

export default LoanComparisonCalculatorPage;