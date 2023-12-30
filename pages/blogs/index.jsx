import "../../styles/globals.css";
import BlogBrowsing from "@/components/layout/blog/gallary";
import BlogList from "@/components/layout/blog/blogList";

export default function Home() {
  return (
    <div>
      <BlogBrowsing />
      <BlogList />
    </div>
  );
}
