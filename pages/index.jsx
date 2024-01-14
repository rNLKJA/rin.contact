import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import LoadingDots from "@/components/ui/LoadingDots";

// Dynamically import your components with custom loading component
const HeroHeaderSection = dynamic(
  () => import("@/components/pages/homepage/HeroSection"),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  },
);
const CtaSection = dynamic(() => import("@/components/pages/homepage/CTA"), {
  loading: () => <LoadingDots />,
  ssr: false,
});
const ContactSection = dynamic(
  () => import("@/components/pages/homepage/Contact"),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  },
);
const AboutSection = dynamic(
  () => import("@/components/pages/homepage/About"),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  },
);
const GallerySection = dynamic(
  () => import("@/components/pages/homepage/Gallery"),
  {
    loading: () => <LoadingDots />,
    ssr: false,
  },
);

const Home = () => {
  return (
    <Suspense fallback={<LoadingDots />}>
      <div>
        <HeroHeaderSection />
        <AboutSection />
        <GallerySection />
        <CtaSection />
        <ContactSection />
      </div>
    </Suspense>
  );
};

export default Home;
