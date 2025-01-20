import { ReactNode } from "react";
import Header from "@/components/Header";

interface MainLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export const MainLayout = ({ children, sidebar }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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