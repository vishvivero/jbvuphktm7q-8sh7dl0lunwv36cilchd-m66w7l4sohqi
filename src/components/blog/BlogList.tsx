import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

export const BlogList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // First query: Get user profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      console.log("Fetching profile for user:", user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      console.log("Profile data:", data);
      return data;
    },
    enabled: !!user?.id,
  });

  // Second query: Get categories
  const { data: categories = [] } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      console.log("Fetching blog categories");
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      
      if (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
      
      console.log("Categories fetched:", data);
      return data || [];
    },
  });

  // Third query: Get blogs with filters
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", searchTerm, selectedCategory, profile?.is_admin],
    queryFn: async () => {
      console.log("Fetching blogs with filters:", {
        searchTerm,
        selectedCategory,
        isAdmin: profile?.is_admin
      });

      let query = supabase
        .from("blogs")
        .select(`
          *,
          profiles (
            email
          )
        `);

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (!profile?.is_admin) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }

      console.log("Blogs fetched:", data?.length, "posts");
      return data || [];
    },
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-200 rounded mb-4" />
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {blogs?.length === 0 ? (
          <Alert>
            <AlertDescription>
              No blog posts found. Try adjusting your search or category filters.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs?.map((blog) => (
              <Link key={blog.id} to={`/blog/post/${blog.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    {blog.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={blog.image_url} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {blog.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{blog.read_time_minutes} min read</span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-2 text-sm">
                          {blog.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100">
                        <span className="line-clamp-1">By {blog.profiles?.email}</span>
                        <span>
                          {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};