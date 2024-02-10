import BlogBrowsing from "@/components/blog/BlogBrowsing";
import BlogList from "@/components/blog/BlogList";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <BlogBrowsing />
      <BlogList />
    </Fragment>
  );
}
