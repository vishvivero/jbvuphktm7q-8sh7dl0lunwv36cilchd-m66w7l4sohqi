import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuthForm } from "@/components/AuthForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PricingFeature {
  text: string;
}

interface PricingPlanProps {
  title: string;
  description: string;
  badge: string;
  price: string;
  interval: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  badgeVariant?: "default" | "secondary";
  onAuthSuccess: () => void;
  isAuthenticated: boolean;
}

export function PricingPlan({
  title,
  description,
  badge,
  price,
  interval,
  features,
  buttonText,
  buttonVariant = "default",
  badgeVariant = "default",
  onAuthSuccess,
  isAuthenticated,
}: PricingPlanProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/planner");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600">{interval}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary mt-0.5" />
            <span className="text-gray-600">{feature.text}</span>
          </li>
        ))}
      </ul>
      {isAuthenticated ? (
        <Button 
          className="w-full" 
          variant={buttonVariant}
          onClick={handleClick}
        >
          Go to Planner
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full" 
              variant={buttonVariant}
              onClick={handleClick}
            >
              {buttonText}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl p-8">
            <DialogHeader>
              <DialogTitle>Start Your Journey</DialogTitle>
            </DialogHeader>
            <div className="mt-8">
              <AuthForm onSuccess={onAuthSuccess} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}