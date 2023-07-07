import React from "react";
import { TbLogout } from "react-icons/tb";
import { RiSettings4Fill } from "react-icons/ri";
import { getAuth } from "firebase/auth";
import Image from "next/image";

const Navbar = ({ signOut, handler }) => {
  const auth = getAuth();
  const logout = () => {
    signOut(auth);
    document.removeEventListener("click", handler, true);
  };
  return (
    <div className="p-6 md:p-10 md:gap-2 flex justify-between items-center">
      <div className="bg-[#4F378B] w-fit py-2 px-3 rounded-2xl">
        <Image
          className="relative top-0.5 drop-shadow-[0px_15px_10px_#00000069]"
          width={25}
          height={25}
          src={"/CheckOffLogo.png"}
          alt=""
        />
      </div>

      <div className="text-2xl">CheckOff</div>
      <div className=" md:flex-1">
        <button
          onClick={logout}
          className="ml-auto flex gap-2 items-center bg-[#4F378B] px-3 py-3 md:px-4 md:py-3 rounded-xl"
        >
          <TbLogout className="text-xl" />
          <div className="hidden md:block">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
