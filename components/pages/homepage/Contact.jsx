import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/legacy/image";
import { RiWechat2Line } from "react-icons/ri";

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
        <p className="leading-8 text-pretty">
          I'm absolutely paw-sitive I'd love to hear from you! If you have any
          questions or are thinking about collaborating, just pawse for a moment
          and reach out – I'm all whiskers and ears! 🐾
        </p>

        <br />

        <div className="grid md:grid-cols-2 gap-2">
          <div className="flex items-center gap-8">
            <TfiEmail style={{ fontSize: "24px" }} />
            <div className="flex flex-col">
              <p href="mailto:huangsunchuangyu@gmail.com" className="font-bold">
                Email
              </p>
              <p href="mailto:huangsunchuangyu@gmail.com">huang@rin.contact</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <RiWechat2Line style={{ fontSize: "24px" }} />
            <div className="flex flex-col">
              <p className="font-bold">WeChat</p>
              <p>+86 138 8533 0703</p>
            </div>
          </div>
        </div>
        <br />
        <div className="grid md:grid-cols-2 gap-2 items-center ">
          <div className="flex items-center gap-8">
            <HiOutlinePhone style={{ fontSize: "24px" }} />
            <div className="flex flex-col">
              <p className="font-bold">Phone</p>
              <p>+61 450 270 703</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <CiLocationOn style={{ fontSize: "24px" }} />
            <div className="flex flex-col ">
              <p className="font-bold">Location</p>
              <p>Melbourne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
