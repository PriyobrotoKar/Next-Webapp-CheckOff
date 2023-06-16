import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <div className="flex mt-6 px-4 py-3 rounded-xl gap-2 items-center border justify-center border-neutral-400">
      <FcGoogle className="text-3xl" />
      <div>Login with Google</div>
    </div>
  );
};

export default GoogleLogin;
