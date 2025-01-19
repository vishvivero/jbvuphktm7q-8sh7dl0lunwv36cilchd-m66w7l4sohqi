import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div className="space-y-4">
          <Link to="/register" className="block text-center">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
          <Link to="/forgot-password" className="block text-sm text-center text-muted-foreground hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}