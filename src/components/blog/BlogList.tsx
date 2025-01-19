import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

export const BlogList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

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

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", searchTerm, selectedCategory, profile?.is_admin, sortBy],
    queryFn: async () => {
      console.log("Fetching blogs with filters:", {
        searchTerm,
        selectedCategory,
        isAdmin: profile?.is_admin,
        sortBy
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

      query = query.order(sortBy === "newest" ? "created_at" : "title", { ascending: sortBy !== "newest" });

      const { data, error } = await query;
      
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-[16/9] bg-gray-200 rounded-t-lg" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${selectedCategory === "all" ? "bg-primary text-white" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories?.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className={`cursor-pointer ${selectedCategory === category.name ? "bg-primary text-white" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px]"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {blogs?.length === 0 ? (
        <Alert>
          <AlertDescription>
            No blog posts found. Try adjusting your search or category filters.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <Link key={blog.id} to={`/blog/post/${blog.slug}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative">
                  {blog.image_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={blog.image_url} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <Badge className="absolute top-4 left-4">
                    {blog.category}
                  </Badge>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.read_time_minutes} mins read</span>
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
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200" />
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {blog.profiles?.email}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};
