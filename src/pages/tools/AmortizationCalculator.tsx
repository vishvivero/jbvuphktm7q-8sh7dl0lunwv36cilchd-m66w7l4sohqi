import { AmortizationCalculator } from "@/components/tools/AmortizationCalculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AmortizationCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Amortization Calculator</h1>
          <p className="text-gray-600 mt-2">
            Calculate your loan payments and view a detailed amortization schedule.
          </p>
        </div>
        <AmortizationCalculator />
      </div>
    </div>
  );
};

export default AmortizationCalculatorPage;