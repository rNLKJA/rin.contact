import { Head } from "next/document";

export function SEOHead() {
  return (
    <Head>
      <meta
        name="description"
        content="Personal Profile website for Rin Huang"
      />
      <meta name="author-full-name" content="Sunchuangyu Huang" />
      <meta name="author-prefer-name" content="Rin Huang" />
      <meta name="author-chinese-name" content="黄孙创宇" />
      <meta name="author-email" content="huangsunchuangyu@gmail.com" />
      <meta name="author-github" content="https://github/rNLKJA" />
      <meta
        name="author-linkedin"
        content="https://www.linkedin.com/in/sunchuangyuhuang/"
      />
      <meta name="author-website" content="https://rin.contact" />
      <meta
        name="instagram"
        content="https://www.instagram.com/chuangyu_hscy"
      />
      <meta
        name="xiaohongshu"
        content="https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab"
      />

      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rin.contact/" />
      <meta property="og:title" content="rNLKJA's Portfolio" />
      <meta
        property="og:description"
        content="Explore my data science projects and read my latest tech insights."
      />
      <meta property="og:image" content="https://rin.contact/meta-image.png" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            name: "rNLKJA",
            url: "https://rin.contact",
            sameAs: [
              "https://github.com/rNLKJA",
              "https://linkedin.com/in/sunchuangyuhuang",
              "https://www.instagram.com/chuangyu_hscy/",
            ],
            jobTitle: "Master of Data Science",
            worksFor: {
              "@type": "Organization",
              name: "University of Melbourne",
            },
            alumniOf: "University of Melbourne",
            description:
              "rNLKJA - Data Scientist, Programmer, and Tech Enthusiast. Explore my portfolio, blog posts, and data science projects.",
          }),
        }}
      />

      <link rel="canonical" href="https://rin.contact" />
      <link rel="alternate" hreflang="x" href="https://x.rin.contact/" />

      <meta property="highschool" content="安顺第二高级中学" />
      <meta property="高中" content="安顺第二高级中学" />
      <meta property="college" content="trinity college" />
      <meta property="姓名" content="Sunchuangyu Huang" />

      <meta charSet="utf-8" />
    </Head>
  );
}
