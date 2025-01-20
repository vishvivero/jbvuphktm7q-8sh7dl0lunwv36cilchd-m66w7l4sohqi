import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { InteractiveTour } from "@/components/onboarding/InteractiveTour";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InteractiveTour />
      <main>{children}</main>
    </div>
  );
};