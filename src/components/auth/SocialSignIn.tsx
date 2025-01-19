import { useToast } from "@/hooks/use-toast";

interface SocialSignInProps {
  isSignUp?: boolean;
}

export function SocialSignIn({ isSignUp = true }: SocialSignInProps) {
  const { toast } = useToast();

  return (
    <div>
      {/* Google sign-in button temporarily removed while we fix OAuth integration */}
    </div>
  );
}
