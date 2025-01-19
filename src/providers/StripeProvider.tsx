import { createContext, useContext, ReactNode } from 'react';

interface StripeContextType {
  createCheckoutSession: (priceId: string) => Promise<string>;
  createPortalSession: () => Promise<string>;
}

const StripeContext = createContext<StripeContextType>({
  createCheckoutSession: async () => '',
  createPortalSession: async () => '',
});

export function StripeProvider({ children }: { children: ReactNode }) {
  const createCheckoutSession = async (priceId: string) => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });
    
    const { url } = await response.json();
    return url;
  };

  const createPortalSession = async () => {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
    });
    
    const { url } = await response.json();
    return url;
  };

  return (
    <StripeContext.Provider value={{ createCheckoutSession, createPortalSession }}>
      {children}
    </StripeContext.Provider>
  );
}

export const useStripe = () => useContext(StripeContext);