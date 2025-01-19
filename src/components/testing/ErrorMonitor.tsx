import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ErrorMonitor = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = async (error: Error) => {
      console.error('Application Error:', error);

      try {
        // Log error to Supabase
        const { error: logError } = await supabase
          .from('system_settings')
          .insert([
            {
              key: 'error_log',
              value: {
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
              }
            }
          ]);

        if (logError) {
          console.error('Error logging failed:', logError);
        }

        // Show user-friendly error message
        toast({
          title: "An error occurred",
          description: "Our team has been notified. Please try again later.",
          variant: "destructive",
        });
      } catch (e) {
        console.error('Error in error handler:', e);
      }
    };

    // Set up global error handler
    window.addEventListener('error', (event) => {
      handleError(event.error);
    });

    // Set up promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason);
    });

    // Cleanup
    return () => {
      window.removeEventListener('error', (event) => handleError(event.error));
      window.removeEventListener('unhandledrejection', (event) => handleError(event.reason));
    };
  }, [toast]);

  return null; // This is a utility component that doesn't render anything
};