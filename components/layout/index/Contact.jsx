import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { RiWechat2Line } from "react-icons/ri";

const ContactSection = () => {
  return (
    <div className="grid md:grid-cols-2 pt-10 pb-10 pl-4 pr-4 gap-4">
      <div className="order-first md:order-last flex flex-col justify-center gap-5">
        <Image
          src="/connection.svg"
          alt="connection image"
          width={250}
          height={250}
          layout="responsive"
          quality={75}
        />
      </div>

      <div className="flex flex-col justify-center">
        <h2>Get in Touch</h2>
        <br />
        <p className="leading-10">
          I'm absolutely paw-sitive I'd love to hear from you! If you have any
          questions or are thinking about collaborating, just pawse for a moment
          and reach out – I'm all whiskers and ears! 🐾
        </p>

        <br />

        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3">
            <TfiEmail style={{ fontSize: "1.5rem" }} />
            <div className="flex flex-col">
              <a href="mailto:huangsunchuangyu@gmail.com" className="font-bold">
                Email
              </a>
              <a href="mailto:huangsunchuangyu@gmail.com">huang@rin.contact</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RiWechat2Line style={{ fontSize: "1.5rem" }} />
            <div className="flex flex-col">
              <p className="font-bold">Wechat</p>
              <p>+86 138 8533 0703</p>
            </div>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3">
            <HiOutlinePhone style={{ fontSize: "1.5rem" }} />
            <div className="flex flex-col">
              <p className="font-bold">Phone</p>
              <p>+61 450 270 703</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CiLocationOn style={{ fontSize: "1.5rem" }} />
            <div className="flex flex-col">
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
