import { Fragment } from "react";
import BlogBrowsing from "@/components/layout/blog/blogBrowsing";
import BlogList from "@/components/layout/blog/blogList";

export default function Home() {
  return (
    <Fragment>
      <BlogBrowsing />
      <BlogList />
    </Fragment>
  );
}
