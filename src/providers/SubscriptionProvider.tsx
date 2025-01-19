import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionStatus {
  isActive: boolean;
  plan: string | null;
  expiresAt: Date | null;
}

const SubscriptionContext = createContext<{
  subscription: SubscriptionStatus;
  loading: boolean;
}>({
  subscription: {
    isActive: false,
    plan: null,
    expiresAt: null,
  },
  loading: true,
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    isActive: false,
    plan: null,
    expiresAt: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch subscription status from your backend
      const fetchSubscription = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('subscription_tier, subscription_status, subscription_end_date')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          return;
        }

        setSubscription({
          isActive: data.subscription_status === 'active',
          plan: data.subscription_tier,
          expiresAt: data.subscription_end_date ? new Date(data.subscription_end_date) : null,
        });
        setLoading(false);
      };

      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscription, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);