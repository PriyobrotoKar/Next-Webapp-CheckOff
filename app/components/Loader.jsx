import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-[100svh] flex justify-center items-center">
      <Image src={"/loader.svg"} alt="" width={150} height={150} />
    </div>
  );
};

export default Loader;
