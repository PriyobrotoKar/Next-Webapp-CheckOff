import React from "react";

const LoginBtn = ({ handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="w-full bg-gradient-to-t from-[#352362] to-[#4F378B] rounded-xl py-3 mt-8"
    >
      Login
    </button>
  );
};

export default LoginBtn;
