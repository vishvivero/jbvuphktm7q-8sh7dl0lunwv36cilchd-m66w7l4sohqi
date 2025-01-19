import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BlogContentProps {
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
}

export const BlogContent = ({
  excerpt,
  setExcerpt,
  content,
  setContent,
}: BlogContentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          placeholder="A brief summary of your post"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="h-24"
        />
      </div>

      <div>
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          placeholder="Write your post content in Markdown format..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-64 font-mono"
        />
      </div>
    </div>
  );
};