import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
        <div className="flex justify-center gap-4">
          <Link to="/settings">
            <Button>Settings</Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}