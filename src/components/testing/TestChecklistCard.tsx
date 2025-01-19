import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface TestCase {
  id: string;
  category: string;
  description: string;
  completed: boolean;
}

const initialTestCases: TestCase[] = [
  // Authentication Tests
  { id: "auth-1", category: "Authentication", description: "Sign up flow works correctly", completed: false },
  { id: "auth-2", category: "Authentication", description: "Login with email works", completed: false },
  { id: "auth-3", category: "Authentication", description: "Password reset flow works", completed: false },
  
  // Debt Management Tests
  { id: "debt-1", category: "Debt Management", description: "Can add new debt", completed: false },
  { id: "debt-2", category: "Debt Management", description: "Can edit existing debt", completed: false },
  { id: "debt-3", category: "Debt Management", description: "Can delete debt", completed: false },
  { id: "debt-4", category: "Debt Management", description: "Debt calculations are accurate", completed: false },
  
  // Payment Tests
  { id: "payment-1", category: "Payments", description: "Monthly payment allocation works", completed: false },
  { id: "payment-2", category: "Payments", description: "One-time funding works", completed: false },
  { id: "payment-3", category: "Payments", description: "Payment history is tracked", completed: false },
  
  // Strategy Tests
  { id: "strategy-1", category: "Strategies", description: "Avalanche strategy works correctly", completed: false },
  { id: "strategy-2", category: "Strategies", description: "Snowball strategy works correctly", completed: false },
  
  // UI/UX Tests
  { id: "ui-1", category: "UI/UX", description: "Responsive on mobile devices", completed: false },
  { id: "ui-2", category: "UI/UX", description: "All forms have validation", completed: false },
  { id: "ui-3", category: "UI/UX", description: "Loading states work correctly", completed: false },
  
  // Performance Tests
  { id: "perf-1", category: "Performance", description: "Page load time under 3 seconds", completed: false },
  { id: "perf-2", category: "Performance", description: "Smooth animations", completed: false },
  
  // Error Handling
  { id: "error-1", category: "Error Handling", description: "Network errors handled gracefully", completed: false },
  { id: "error-2", category: "Error Handling", description: "Form validation errors clear", completed: false }
];

export const TestChecklistCard = () => {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const { toast } = useToast();
  
  const handleCheckTest = (id: string) => {
    setTestCases(prev => prev.map(test => 
      test.id === id ? { ...test, completed: !test.completed } : test
    ));
  };

  const calculateProgress = () => {
    const completed = testCases.filter(test => test.completed).length;
    return (completed / testCases.length) * 100;
  };

  const handleSaveProgress = () => {
    // Here you could implement saving to Supabase or local storage
    toast({
      title: "Progress Saved",
      description: `Test progress: ${calculateProgress().toFixed(1)}% complete`,
    });
  };

  const categories = Array.from(new Set(testCases.map(test => test.category)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Launch Readiness Checklist</span>
            <span className="text-sm font-normal">
              {calculateProgress().toFixed(1)}% Complete
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-lg">{category}</h3>
                <div className="space-y-2">
                  {testCases
                    .filter(test => test.category === category)
                    .map(test => (
                      <div
                        key={test.id}
                        className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                      >
                        <Checkbox
                          checked={test.completed}
                          onCheckedChange={() => handleCheckTest(test.id)}
                          id={test.id}
                        />
                        <label
                          htmlFor={test.id}
                          className="text-sm cursor-pointer flex-grow"
                        >
                          {test.description}
                        </label>
                        {test.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveProgress} className="w-full">
              Save Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};