import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { AdminBlogList } from "@/components/admin/AdminBlogList";
import { BlogPostForm } from "@/components/blog/BlogPostForm";
import { CategoryManager } from "@/components/blog/CategoryManager";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserManagement } from "@/components/admin/UserManagement";
import { SystemSettings } from "@/components/admin/SystemSettings";
import { SecurityMonitoring } from "@/components/admin/SecurityMonitoring";
import { AuditLogs } from "@/components/admin/AuditLogs";
import { AnalyticsReporting } from "@/components/admin/AnalyticsReporting";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { PerformanceMetrics } from "@/components/admin/PerformanceMetrics";

const Admin = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading admin profile. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!profile?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout sidebar={<AdminSidebar />}>
      <div className="p-6">
        <Routes>
          <Route index element={<AdminMetrics />} />
          <Route path="blogs" element={<AdminBlogList />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="new-post" element={
            <BlogPostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              category={category}
              setCategory={setCategory}
              image={image}
              setImage={setImage}
              imagePreview={imagePreview}
            />
          } />
          <Route path="edit/:id" element={
            <BlogPostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              category={category}
              setCategory={setCategory}
              image={image}
              setImage={setImage}
              imagePreview={imagePreview}
            />
          } />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="security" element={<SecurityMonitoring />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="analytics" element={<AnalyticsReporting />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="performance" element={<PerformanceMetrics />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default Admin;