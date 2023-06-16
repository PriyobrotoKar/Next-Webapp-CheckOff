import React from "react";
import Banner from "../components/login/Banner";
import GoogleLogin from "../components/login/GoogleLogin";
import LoginForm from "../components/login/LoginForm";

const page = () => {
  return (
    <div className="px-10 rounded-3xl overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#26242A]">
      <Banner />
      <GoogleLogin />
      <div className="flex gap-2 items-center mt-6">
        <div className="h-[0.1rem] bg-neutral-600 flex-1"></div>
        <div className="text-center text-neutral-500">OR</div>
        <div className="h-[0.1rem] bg-neutral-600 flex-1"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default page;
