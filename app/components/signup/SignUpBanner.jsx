import React from "react";
import Image from "next/image";
import "./banner.css";
const SignUpBanner = () => {
  return (
    <div>
      <div className="relative">
        <div className="mx-auto mt-8 w-fit bg-[#4F378B] py-3 px-4 rounded-3xl shadow-[0px_-28px_40px_47px_#4F378B22]">
          <Image
            className="relative top-1 drop-shadow-[0px_15px_10px_#00000069]"
            width={40}
            height={40}
            src={"/CheckOffLogo.png"}
            alt=""
          />
        </div>
        <div className="mt-12 space-y-1">
          <h1 className="text-2xl text-center">Welcome to CheckOff</h1>
          <p className="text-sm text-[#9B9B9B] text-center">
            Please enter your details to sign in
          </p>
        </div>
        <div className=" absolute -z-10 top-0 left-1/2 w-3/4 h-1/2 -translate-x-1/2 ">
          <div className="absolute w-full h-full inset-0 gridGradient z-10"></div>
          <Image className="object-cover" src={"/grid.png"} alt="" fill />
        </div>
      </div>
    </div>
  );
};

export default SignUpBanner;
