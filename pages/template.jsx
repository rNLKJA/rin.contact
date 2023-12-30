import React from "react";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return <DataArticle />;
}

export const DataArticle = () => {
  return (
    <PageTransition>
      <div>
        <h2>
          The Transformative Impact of Data Science on Business Efficiency and
          Growth
        </h2>
      </div>
    </PageTransition>
  );
};
