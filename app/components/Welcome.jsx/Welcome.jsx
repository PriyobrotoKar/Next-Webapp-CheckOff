import Image from "next/image";
import React from "react";

const Welcome = ({ authUser }) => {
  return (
    <div className="w-[50rem] mx-auto text-center space-y-6 mt-10">
      <div>
        <Image
          className="mx-auto rounded-full"
          src={authUser.image}
          alt=""
          width={96}
          height={96}
        />
      </div>
      <div className="space-y-2">
        <div className="text-4xl text-neutral-300">
          Welcome back,{" "}
          {authUser.username.substring(
            0,
            authUser.username.indexOf(" ") === -1
              ? authUser.username.length
              : authUser.username.indexOf(" ")
          )}
        </div>
        <div className="text-neutral-400">
          You’ve got 7 tasks coming up in the next days.
        </div>
      </div>
    </div>
  );
};

export default Welcome;
