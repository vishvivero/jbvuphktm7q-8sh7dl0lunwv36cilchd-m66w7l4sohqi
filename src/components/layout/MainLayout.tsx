import { Header } from "@/components/Header";
import { InteractiveTour } from "@/components/onboarding/InteractiveTour";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const MainLayout = ({ children, sidebar }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InteractiveTour />
      <div className="flex">
        {sidebar && (
          <aside className="w-64 min-h-screen bg-white border-r">
            {sidebar}
          </aside>
        )}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};