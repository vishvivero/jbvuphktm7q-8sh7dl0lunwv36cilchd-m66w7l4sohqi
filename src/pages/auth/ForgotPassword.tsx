import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <div className="space-y-4">
          <Link to="/login" className="block text-center">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}