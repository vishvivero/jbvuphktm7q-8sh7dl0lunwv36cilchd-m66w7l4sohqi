import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailFormProps {
  isSignUp: boolean;
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  onForgotPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  policyAgreed?: boolean;
  setPolicyAgreed?: (agreed: boolean) => void;
  marketingConsent?: boolean;
  setMarketingConsent?: (consent: boolean) => void;
}

export function EmailForm({
  isSignUp,
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onForgotPassword,
  onSubmit,
  policyAgreed,
  setPolicyAgreed,
  marketingConsent,
  setMarketingConsent
}: EmailFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isSignUp && (
        <>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="policies" 
                checked={policyAgreed} 
                onCheckedChange={(checked) => setPolicyAgreed?.(checked as boolean)}
                required
              />
              <Label 
                htmlFor="policies" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketing" 
                checked={marketingConsent} 
                onCheckedChange={(checked) => setMarketingConsent?.(checked as boolean)}
              />
              <Label 
                htmlFor="marketing" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I would like to receive marketing communications about product updates and news
              </Label>
            </div>
          </div>
        </>
      )}

      {!isSignUp && (
        <Button
          type="button"
          variant="link"
          className="px-0 font-normal"
          onClick={onForgotPassword}
        >
          Forgot password?
        </Button>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isSignUp ? "Creating account..." : "Signing in..."}
          </>
        ) : (
          <>{isSignUp ? "Create account" : "Sign in"}</>
        )}
      </Button>
    </form>
  );
}