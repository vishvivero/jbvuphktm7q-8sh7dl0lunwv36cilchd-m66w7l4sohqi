import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SocialSignInProps {
  isSignUp?: boolean;
}

export function SocialSignIn({ isSignUp = true }: SocialSignInProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      console.log("Initiating Google sign in process...");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/overview`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          skipBrowserRedirect: true
        }
      });

      if (error) {
        console.error("Google sign in error:", error);
        throw error;
      }

      if (!data.url) {
        console.error("No OAuth URL returned from Supabase");
        throw new Error("Failed to initiate Google sign in");
      }

      console.log("Google sign in URL generated:", data.url);
      
      // Extract the base URL without query parameters
      const baseUrl = window.location.origin + '/overview';
      console.log("Base redirect URL:", baseUrl);
      
      // Construct the OAuth URL with the correct redirect
      const oauthUrl = new URL(data.url);
      oauthUrl.searchParams.set('redirect_to', baseUrl);
      console.log("Final OAuth URL:", oauthUrl.toString());
      
      // Redirect to Google's OAuth flow
      window.location.href = oauthUrl.toString();
      
    } catch (error: any) {
      console.error("Failed to sign in with Google:", error);
      
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "Failed to sign in with Google. Please try again.",
      });
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 flex items-center justify-center gap-2"
        type="button"
        onClick={handleGoogleSignIn}
      >
        <img 
          src="/google.svg" 
          alt="Google" 
          className="w-5 h-5"
        />
        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
      </Button>
    </div>
  );
}