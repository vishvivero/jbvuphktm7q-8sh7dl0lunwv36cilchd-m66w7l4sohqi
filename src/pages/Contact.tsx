import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}