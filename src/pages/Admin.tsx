import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminBlogList } from "@/components/blog/AdminBlogList";
import { CategoryManager } from "@/components/blog/CategoryManager";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ChartBar, PenTool, List } from "lucide-react";
import { BlogPostForm } from "@/components/blog/BlogPostForm";
import { useToast } from "@/components/ui/use-toast";

export default function Admin() {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // First, check if we have a valid session
  useEffect(() => {
    if (authLoading) return;

    const checkSession = async () => {
      console.log("Checking session state:", { 
        userExists: !!user, 
        sessionExists: !!session,
        userId: user?.id 
      });
      
      if (!session || !user) {
        console.log("No valid session or user found");
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the admin area.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkSession();
  }, [navigate, toast, user, session, authLoading]);

  // Then fetch the profile only if we have a valid user ID
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["adminProfile", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log("No user ID available for profile fetch");
        return null;
      }

      console.log("Fetching admin profile for user:", user.id);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Profile fetch error:", error);
          throw error;
        }

        console.log("Admin profile data:", data);
        return data;
      } catch (error) {
        console.error("Error in profile query:", error);
        toast({
          title: "Error",
          description: "Failed to verify admin access. Please try signing in again.",
          variant: "destructive",
        });
        navigate("/");
        return null;
      }
    },
    enabled: !!user?.id && !!session,
    retry: false,
    meta: {
      errorMessage: "Failed to verify admin access. Please try signing in again."
    }
  });

  // Check admin access after profile is loaded
  useEffect(() => {
    if (authLoading || profileLoading) return;

    if (!user || !profile?.is_admin) {
      console.log("User not authorized:", {
        authLoading,
        profileLoading,
        userExists: !!user,
        isAdmin: profile?.is_admin
      });
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, profile, authLoading, profileLoading, navigate, toast]);

  if (authLoading || profileLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not admin
  if (!profile?.is_admin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-8 h-8" />
              Admin Dashboard
            </CardTitle>
          </CardHeader>
        </Card>

        <Routes>
          <Route
            path="/"
            element={
              <Tabs defaultValue="blog-posts" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="metrics" className="flex items-center gap-2">
                    <ChartBar className="w-4 h-4" />
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger value="blog-posts" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Blog Posts
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Categories
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metrics">
                  <AdminMetrics />
                </TabsContent>

                <TabsContent value="blog-posts">
                  <AdminBlogList />
                </TabsContent>

                <TabsContent value="categories">
                  <CategoryManager />
                </TabsContent>
              </Tabs>
            }
          />
          <Route path="/new" element={<BlogPostForm />} />
          <Route path="/edit/:id" element={<BlogPostForm />} />
        </Routes>
      </div>
    </Layout>
  );
}