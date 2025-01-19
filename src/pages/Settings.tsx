import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>
        <div className="flex justify-center">
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}