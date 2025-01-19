import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Privacy policy content goes here...</p>
        </div>
      </div>
    </div>
  );
}