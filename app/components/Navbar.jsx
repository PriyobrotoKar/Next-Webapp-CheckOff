import React from "react";
import { TbLogout } from "react-icons/tb";
import { RiSettings4Fill } from "react-icons/ri";

const Navbar = ({ signOut, handler }) => {
  const logout = () => {
    signOut();
    document.removeEventListener("click", handler, true);
  };
  return (
    <div className="p-10 flex justify-between">
      <div></div>
      <div className="flex items-center gap-4">
        {/* <button className="">
          <RiSettings4Fill className="text-xl" />
        </button> */}
        <button
          onClick={logout}
          className="flex gap-2 items-center bg-[#4F378B] px-4 py-3 rounded-xl"
        >
          <TbLogout className="text-xl" />
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
