import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ChevronLeft, ChevronRight, Info, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface GuidedTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GuidedTour = ({ open, onOpenChange }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const tourSteps = [
    {
      title: "Welcome to Debtfreeo! 👋",
      description: "Let's take a quick tour to help you get started on your debt-free journey.",
      image: "/lovable-uploads/6ce71a6f-54b3-413b-b53f-293d8a70fb0f.png"
    },
    {
      title: "Dashboard Overview",
      description: "Your dashboard shows your debt score, payment progress, and personalized recommendations.",
      image: "/lovable-uploads/8d0a82e9-c145-44e4-874f-3a5833ba89e2.png"
    },
    {
      title: "Add Your Debts",
      description: "Start by adding your debts. Click the 'Add Debt' button to input your credit cards, loans, or other obligations.",
      image: "/lovable-uploads/74be8f24-1cd3-4578-ae1d-3f77627da9fd.png"
    },
    {
      title: "Track Your Progress",
      description: "Watch your progress with interactive charts and celebrate each milestone on your journey.",
      image: "/lovable-uploads/40145d71-6791-4c33-91a7-d836ec3786a8.png"
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ has_completed_tour: true })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: "Tour Completed! 🎉",
          description: "You're all set to start your debt-free journey.",
        });
      } catch (error) {
        console.error('Error updating tour status:', error);
      }
    }
    onOpenChange(false);
    navigate("/overview");
  };

  const handleSkip = () => {
    completeTour();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="relative">
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6">
            {/* Progress indicator */}
            <div className="flex justify-between mb-8">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full transition-colors ${
                    index + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {tourSteps[currentStep - 1].title}
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  {tourSteps[currentStep - 1].description}
                </p>
              </div>

              <div className="relative rounded-lg overflow-hidden aspect-video">
                <img
                  src={tourSteps[currentStep - 1].image}
                  alt={`Step ${currentStep}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>

                <div className="space-x-4">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-gray-500"
                  >
                    Skip Tour
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="gap-2"
                  >
                    {currentStep === tourSteps.length ? (
                      <>
                        Get Started <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};