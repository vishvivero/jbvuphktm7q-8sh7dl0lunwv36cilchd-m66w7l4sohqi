import { CreditCardPayoffCalculator } from "@/components/tools/CreditCardPayoffCalculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { LegalFooter } from "@/components/legal/LegalFooter";

const CreditCardPayoffCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Credit Card Payoff Calculator</h1>
          <p className="text-gray-600 mt-2 mb-8">
            Plan your credit card debt payoff strategy and timeline.
          </p>
          <CreditCardPayoffCalculator />
        </div>
      </div>

      <footer className="mt-auto bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About</h4>
              <p className="text-gray-600">
                Calculate how long it will take to pay off your credit card debt and explore different payment strategies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/tools" className="hover:text-primary transition-colors">
                    All Calculators
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary transition-colors">
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

export default CreditCardPayoffCalculatorPage;