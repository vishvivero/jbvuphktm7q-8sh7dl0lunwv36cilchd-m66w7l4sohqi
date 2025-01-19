import { createContext, useContext, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackPageView: (pageName: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackPageView: () => {},
});

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log('Track event:', eventName, properties);
    // Implement your analytics tracking here
  };

  const trackPageView = (pageName: string) => {
    console.log('Track page view:', pageName);
    // Implement your page view tracking here
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);