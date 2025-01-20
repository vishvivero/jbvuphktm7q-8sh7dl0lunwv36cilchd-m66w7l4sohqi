import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { OverviewHeader } from "@/components/overview/OverviewHeader";
import { OverviewSummary } from "@/components/overview/OverviewSummary";
import { OverviewDebts } from "@/components/overview/OverviewDebts";
import { OverviewProgress } from "@/components/overview/OverviewProgress";
import { OverviewPayment } from "@/components/overview/OverviewPayment";
import { OverviewChart } from "@/components/overview/OverviewChart";
import { DebtComparison } from "@/components/overview/DebtComparison";
import { DebtScoreCard } from "@/components/overview/DebtScoreCard";
import { DebtFreeCountdown } from "@/components/overview/DebtFreeCountdown";
import { GuidedTour } from "@/components/onboarding/GuidedTour";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/integrations/supabase/client";

export default function Overview() {
  const [showTour, setShowTour] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const checkTourStatus = async () => {
      if (profile && !profile.has_completed_tour) {
        setShowTour(true);
      }
    };

    checkTourStatus();
  }, [profile]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <OverviewHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DebtScoreCard />
          <DebtFreeCountdown />
          <OverviewPayment />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OverviewProgress />
          <OverviewChart />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <OverviewDebts />
          <DebtComparison />
          <OverviewSummary />
        </div>
      </div>

      <GuidedTour 
        open={showTour} 
        onOpenChange={setShowTour}
      />
    </MainLayout>
  );
}