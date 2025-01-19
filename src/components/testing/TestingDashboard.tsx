import { TestChecklistCard } from "./TestChecklistCard";
import { ErrorMonitor } from "./ErrorMonitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState } from "react";

export const TestingDashboard = () => {
  const [isTestingActive, setIsTestingActive] = useState(false);
  const { toast } = useToast();
  
  const handleStartTesting = () => {
    setIsTestingActive(true);
    toast({
      title: "Testing Mode Activated",
      description: "Error monitoring and logging are now active.",
    });
  };

  const handleStopTesting = () => {
    setIsTestingActive(false);
    toast({
      title: "Testing Mode Deactivated",
      description: "Error monitoring and logging have been stopped.",
    });
  };

  const handleReset = () => {
    setIsTestingActive(false);
    toast({
      title: "Testing Reset",
      description: "All test cases have been reset.",
    });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testing Dashboard</h1>
        <div className="space-x-2">
          {isTestingActive ? (
            <Button
              variant="destructive"
              onClick={handleStopTesting}
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Stop Testing
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleStartTesting}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Testing
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TestChecklistCard />
        
        <Card>
          <CardHeader>
            <CardTitle>Testing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Error Monitoring:</span>
                <span className={isTestingActive ? "text-green-500" : "text-red-500"}>
                  {isTestingActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Log Collection:</span>
                <span className={isTestingActive ? "text-green-500" : "text-red-500"}>
                  {isTestingActive ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isTestingActive && <ErrorMonitor />}
    </div>
  );
};