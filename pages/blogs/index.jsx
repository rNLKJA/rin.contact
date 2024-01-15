import { Fragment } from "react";
import BlogBrowsing from "@/components/pages/blog/blogBrowsing";
import BlogList from "@/components/pages/blog/blogList";

export default function Home() {
  return (
    <Fragment>
      <BlogBrowsing />
      <BlogList />
    </Fragment>
  );
}
