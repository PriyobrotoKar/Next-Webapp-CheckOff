"use client";
import { upload } from "@/firebase/storage";
import { Power4, gsap } from "gsap";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

const Welcome = ({ authUser }) => {
  const headerRef = useRef(null);
  const subTitleRef = useRef(null);
  const profileImageRef = useRef(null);
  const [photo, setPhoto] = useState(authUser.image);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const photo = e.target.files[0];

    if (photo) {
      upload(photo, authUser, setLoading).then((photoURL) =>
        setPhoto(photoURL)
      );
    }
  };

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { autoAlpha: 0, y: "15vh", fontSize: "4rem" },
      { autoAlpha: 1, y: "15vh", duration: 1.5, ease: Power4, fontSize: "4rem" }
    )
      .fromTo(
        subTitleRef.current,
        { autoAlpha: 0, y: "16vh", fontSize: "1.3rem" },
        {
          autoAlpha: 1,
          y: "16vh",
          duration: 1.5,
          ease: Power4,
          fontSize: "1.3rem",
        }
      )
      .from(profileImageRef.current, {
        autoAlpha: 0,
        duration: 1,
        ease: Power4,
      })
      .to(headerRef.current, {
        y: "0",
        duration: 1,
        ease: Power4,
        fontSize: "3rem",
        delay: -1,
      })
      .to(subTitleRef.current, {
        y: "0",
        duration: 1,
        ease: Power4,
        fontSize: "1.1rem",
        delay: -1,
      });
  }, []);

  return (
    <div className="w-fit mx-auto  text-center space-y-6 mt-10">
      <label htmlFor="upload">
        <div
          ref={profileImageRef}
          className="relative w-fit mx-auto rounded-full overflow-hidden cursor-pointer"
        >
          <Image className="peer" src={photo} alt="" width={96} height={96} />

          <div className="absolute w-full bottom-0 bg-[#4f378b59] backdrop-blur-md py-1 opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-all">
            <MdModeEditOutline className="mx-auto" />
          </div>
        </div>
      </label>
      <input
        type="file"
        id="upload"
        className="hidden"
        onChange={handleChange}
        accept=".png,.jpg"
      />
      <div className="space-y-3">
        <div ref={headerRef} className="text-4xl text-neutral-300">
          Welcome back,{" "}
          {authUser.username.substring(
            0,
            authUser.username.indexOf(" ") === -1
              ? authUser.username.length
              : authUser.username.indexOf(" ")
          )}
        </div>
        <div className="text-neutral-400" ref={subTitleRef}>
          You’ve got 7 tasks coming up in the next days.
        </div>
      </div>
    </div>
  );
};

export default Welcome;
