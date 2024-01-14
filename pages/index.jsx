import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import LoadingDots from "@/components/ui/LoadingDots";

const HeroHeaderSection = React.lazy(() =>
  import("@/components/pages/homepage/HeroSection"),
);
const AboutSection = React.lazy(() =>
  import("@/components/pages/homepage/About"),
);
const GallerySection = React.lazy(() =>
  import("@/components/pages/homepage/Gallery"),
);
const CtaSection = React.lazy(() => import("@/components/pages/homepage/CTA"));
const ContactSection = React.lazy(() =>
  import("@/components/pages/homepage/Contact"),
);

const Home = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingDots />}>
        <HeroHeaderSection />
      </Suspense>
      <Suspense fallback={<LoadingDots />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<LoadingDots />}>
        <GallerySection />
      </Suspense>

      <Suspense fallback={<LoadingDots />}>
        <CtaSection />
      </Suspense>

      <Suspense fallback={<LoadingDots />}>
        <ContactSection />
      </Suspense>
    </React.Fragment>
  );
};

export default Home;
