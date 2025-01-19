import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Financial Freedom
        </h1>
        <div className="flex justify-center gap-4">
          <Link to="/tools">
            <Button>Explore Tools</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}