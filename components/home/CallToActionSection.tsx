import React from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CallToActionContainer = styled.div`
  ${cn}
`;

export const CallToActionSection: React.FC = () => {
  const router = useRouter();

  return (
    <CallToActionContainer
      className="flex flex-col justify-center items-center border-solid border-2 hover:border-dashed px-4 mt-20 mb-20"
      style={{ minHeight: 500 }}
    >
      <h2 className="font-bold text-center text-4xl text-pretty">
        Transforming Data into Actionable Insights
      </h2>
      <br />
      <p className="leading-loose text-pretty text-center text-xl">
        Unlock the power of your data with our expert consultation and project
        discussions.
      </p>
      <br />
      <CtaButtons router={router} />
    </CallToActionContainer>
  );
};

interface CtaButtonsProps {
  router: any;
}

const CtaButtons: React.FC<CtaButtonsProps> = ({ router }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <ContactButton router={router} />
      <LearnMoreButton router={router} />
    </div>
  );
};

interface ButtonProps {
  router: any;
}

const ContactButton: React.FC<ButtonProps> = ({ router }) => {
  return (
    <Button
      className="bg-black text-white rounded hover:text-black border-2 border-black border-grey-100"
      onClick={() => router.push("/contact/")}
      style={{ width: "150px" }}
    >
      Contact
    </Button>
  );
};

const LearnMoreButton: React.FC<ButtonProps> = ({ router }) => {
  return (
    <Button
      className="bg-white text-black rounded hover:text-white hover:bg-black border-2 border-grey-100"
      onClick={() => router.push("/blogs/data/")}
      style={{ width: "150px" }}
    >
      Learn More
    </Button>
  );
};
