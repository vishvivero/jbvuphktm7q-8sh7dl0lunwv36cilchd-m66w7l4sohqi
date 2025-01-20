import { useEffect, useState } from "react";
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride";
import { useDebts } from "@/hooks/use-debts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";

export const InteractiveTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { debts, profile } = useDebts();
  const { updateProfile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only start the tour if user hasn't completed it and is logged in
    if (profile && !profile.has_completed_tour) {
      console.log("Starting guided tour for new user");
      setRun(true);
    }
  }, [profile]);

  const steps: Step[] = [
    {
      target: ".add-first-debt-btn",
      content: "Let's get started! Click here to add your first debt and take the first step toward debt freedom.",
      placement: "left",
      disableBeacon: true,
    },
    {
      target: ".debt-score-section",
      content: "This is your current debt score—a quick overview of your financial health based on the debts you've added.",
      placement: "bottom",
    },
    {
      target: ".debt-status-section",
      content: "Here's your current debt status. This gives you a snapshot of your debts and helps you track your progress.",
      placement: "bottom",
    },
    {
      target: ".potential-savings-section",
      content: "These are your initial potential savings without any extra payments. Let's explore how you can save even more!",
      placement: "bottom",
    },
    {
      target: ".optimize-debt-btn",
      content: "Click here to create your personalized debt repayment plan and reduce interest costs further.",
      placement: "bottom",
    },
    {
      target: ".extra-payments-section",
      content: "Making extra monthly payments is a great way to pay off your debts faster. Adjust this to see how it impacts your timeline.",
      placement: "left",
    },
    {
      target: ".one-time-funding-section",
      content: "Have a bonus or extra money? Plan to add one-time payments here to accelerate your progress even more.",
      placement: "right",
    },
    {
      target: ".timeline-graph-section",
      content: "This graph shows your original timeline versus the accelerated timeline with your optimizations. Track your journey to debt freedom!",
      placement: "top",
    },
    {
      target: ".debts-nav-link",
      content: "Need to add more debts? Click here to add and manage additional debts anytime.",
      placement: "right",
    },
  ];

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { action, index, status, type } = data;
    console.log("Tour callback:", { action, index, status, type });

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      
      // Mark tour as completed in the database
      if (profile) {
        try {
          await updateProfile.mutateAsync({
            ...profile,
            has_completed_tour: true
          });
          console.log("Tour completion status updated in database");
        } catch (error) {
          console.error("Error updating tour completion status:", error);
          toast({
            title: "Error",
            description: "Failed to update tour status",
            variant: "destructive",
          });
        }
      }
    }

    // Handle navigation between pages if needed
    if (type === EVENTS.STEP_AFTER && index === 4) {
      navigate("/strategy");
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      hideBackButton={false}
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      stepIndex={stepIndex}
      styles={{
        options: {
          primaryColor: "#10B981",
          textColor: "#374151",
          zIndex: 10000,
        },
      }}
    />
  );
};