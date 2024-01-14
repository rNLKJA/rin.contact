import React from "react";
import Image from "next/legacy/image";

const ContactSection = () => {
  return (
    <div className="grid md:grid-cols-2 py-10 gap-4 items-center justify-center ">
      <div className="order-first md:order-last flex flex-col justify-center gap-5 items-center">
        <Image
          src="/images//index/connection.svg"
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
          I&apos;m absolutely paw-sitive I&apos;d love to hear from you! If you
          have any questions or are thinking about collaborating, just pawse for
          a moment and reach out – I&apos;m all whiskers and ears! 🐾
        </p>

        <br />

        <div className="grid md:grid-cols-2 gap-5">
          <ContactDetail type="email" value="huang@rin.contact" />

          <ContactDetail type="wechat" value="+86 138 8533 0703" />

          <ContactDetail type="phone" value="+61 450 270 703" />

          <ContactDetail type="location" value="Melbourne" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

const ContactDetail = ({ icon, title, value }) => {
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
