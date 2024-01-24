import React, { ReactNode } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { RiWechat2Line } from "react-icons/ri";
import Image from "next/image";

const ContactContainer = styled.div`
  ${cn}
`;

interface ContactDetailProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="flex items-center gap-8">
      {icon}
      <div className="flex flex-col">
        <p className="font-bold">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  return (
    <ContactContainer>
      <div className="grid md:grid-cols-2 py-10 gap-4 items-center justify-center ">
        <div className="order-first md:order-last flex flex-col justify-center gap-5 items-center">
          <Image
            src="/images/index/connection.svg"
            alt="connection image"
            width={300}
            height={300}
            quality={50}
            layout="intrinsic"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-3xl">Get in Touch</h2>
          <br />
          <p className="leading-loose text-pretty text-lg">
            I&apos;m absolutely paw-sitive I&apos;d love to hear from you! If
            you have any questions or are thinking about collaborating, just
            pawse for a moment and reach out – I&apos;m all whiskers and ears!
            🐾
          </p>

          <br />

          <div className="grid md:grid-cols-2 gap-5">
            <ContactDetail
              title="Email"
              value="huang@rin.contact"
              icon={<TfiEmail style={{ fontSize: "24px" }} />}
            />

            <ContactDetail
              title="Wechat"
              value="+86 138 8533 0703"
              icon={<RiWechat2Line style={{ fontSize: "24px" }} />}
            />

            <ContactDetail
              title="Phone"
              value="+61 450 270 703"
              icon={<HiOutlinePhone style={{ fontSize: "24px" }} />}
            />

            <ContactDetail
              title="Location"
              value="Melbourne"
              icon={<CiLocationOn style={{ fontSize: "24px" }} />}
            />
          </div>
        </div>
      </div>
    </ContactContainer>
  );
};
