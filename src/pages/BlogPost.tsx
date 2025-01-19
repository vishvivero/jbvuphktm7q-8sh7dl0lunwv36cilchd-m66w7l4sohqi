import React from "react";
import { BlogPost as BlogPostComponent } from "@/components/blog/BlogPost";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <BlogPostComponent />
      </div>
    </div>
  );
}