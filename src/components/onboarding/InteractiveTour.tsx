import { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";
import { useDebts } from "@/hooks/use-debts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const InteractiveTour = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState(false);
  const { debts, profile } = useDebts();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only start the tour for new users who haven't completed it
    if (profile && profile.has_completed_tour === false) {
      const hasDebts = debts && debts.length > 0;
      
      const tourSteps = hasDebts ? getMainTourSteps() : getInitialTourSteps();
      setSteps(tourSteps);
      setRun(true);
    }
  }, [profile, debts]);

  const getInitialTourSteps = (): Step[] => [
    {
      target: '[data-tour="add-first-debt"]',
      content: "Let's start by adding your first debt. Click here to begin your journey to financial freedom!",
      disableBeacon: true,
      placement: "left",
    }
  ];

  const getMainTourSteps = (): Step[] => [
    {
      target: '[data-tour="debt-score"]',
      content: "This is your Debt Score. It shows how well you're managing your debts and where you can improve.",
      disableBeacon: true,
    },
    {
      target: '[data-tour="debt-status"]',
      content: "Here's your current debt situation. This section shows how your debts look right now without any optimizations.",
    },
    {
      target: '[data-tour="potential-savings"]',
      content: "See what Debtfreeo can save you! This shows your potential savings even before making any extra payments.",
    },
    {
      target: '[data-tour="optimize-button"]',
      content: "Click here to start optimizing your debt repayment plan and save more on interest!",
    },
    {
      target: '[data-tour="extra-payment"]',
      content: "Make extra monthly payments here to pay off your debts faster.",
    },
    {
      target: '[data-tour="one-time-funding"]',
      content: "Plan upcoming extra payments like bonuses or any excess money to accelerate your debt payoff.",
    },
    {
      target: '[data-tour="payoff-timeline"]',
      content: "This graph shows your original vs accelerated debt payoff timeline. Watch how extra payments can speed up your journey!",
    },
    {
      target: '[data-tour="add-more-debts"]',
      content: "Don't forget to add all your debts to get the most accurate recommendations and savings calculations.",
    }
  ];

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { status, action, index, type } = data;
    
    console.log('Tour callback:', { status, action, index, type });

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Mark tour as completed in the database
      if (profile) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ has_completed_tour: true })
            .eq('id', profile.id);

          if (error) throw error;

          // If user hasn't added any debts yet, show the add debt dialog
          if (!debts || debts.length === 0) {
            toast({
              title: "Let's add your first debt",
              description: "Start by adding your debts to see how we can help you become debt-free faster.",
            });
          } else if (status === STATUS.FINISHED) {
            // Navigate to strategy page if tour completed normally
            navigate("/strategy");
          }
        } catch (error) {
          console.error('Error updating tour status:', error);
        }
      }
      setRun(false);
    }

    // If user completes initial step (adding first debt)
    if (index === 0 && type === "step:after" && debts && debts.length > 0) {
      // Update steps to show the main tour
      setSteps(getMainTourSteps());
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      hideBackButton={debts && debts.length === 0}
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
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