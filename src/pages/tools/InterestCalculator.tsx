import { InterestCalculator } from "@/components/tools/InterestCalculator";

const InterestCalculatorPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Interest Calculator</h1>
      <InterestCalculator />
    </div>
  );
};

export default InterestCalculatorPage;