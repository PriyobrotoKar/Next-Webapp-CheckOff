import React from "react";

const LoginForm = () => {
  return (
    <form action="" className="space-y-4">
      <div>
        <label className="block" htmlFor="">
          Username
        </label>
        <input type="text" className="w-full" />
      </div>
      <div>
        <label className="block" htmlFor="">
          Email Address
        </label>
        <input type="text" className="w-full" />
      </div>
      <div>
        <label className="block" htmlFor="">
          Password
        </label>
        <input type="text" className="w-full" />
      </div>
    </form>
  );
};

export default LoginForm;
