import React from "react";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div
      className="flex md:flex-row h-full justify-center items-center gap-10"
      style={{ padding: "50px", textAlign: "center" }}
    >
      <div>
        <Image src="/404.png" alt="404.png" width={300} height={300} />
      </div>
      <div>
        <h1>404</h1>
        <p>Oops! The page you're looking for was not found.</p>
      </div>
    </div>
  );
};

export default Custom404;
