"use client";
import { db } from "@/firebase/firebase";
import { upload } from "@/firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Power4, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
gsap.registerPlugin(ScrollTrigger);

const Welcome = ({ authUser, todos }) => {
  const headerRef = useRef(null);
  const subTitleRef = useRef(null);
  const profileImageRef = useRef(null);
  const bannerRef = useRef(null);
  const taskCountRef = useRef(null);
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
    let mm = gsap.matchMedia(),
      breakPoint = 979;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
      },
      (context) => {
        let { isDesktop } = context.conditions;

        tl.fromTo(
          headerRef.current,
          {
            autoAlpha: 0,
            y: isDesktop ? "15vh" : "9vh",
            width: isDesktop ? "100%" : "20rem",
            fontSize: isDesktop ? "4rem" : "2.5rem",
          },
          {
            autoAlpha: 1,
            width: isDesktop ? "100%" : "16rem",
            y: isDesktop ? "15vh" : "9vh",
            duration: 1.5,
            ease: Power4,
            fontSize: isDesktop ? "4rem" : "2rem",
          }
        )
          .fromTo(
            subTitleRef.current,
            {
              autoAlpha: 0,
              y: isDesktop ? "16vh" : "10vh",
              fontSize: isDesktop ? "1.3rem" : "0.8rem",
            },
            {
              autoAlpha: 1,
              y: isDesktop ? "16vh" : "10vh",
              duration: 1.5,
              ease: Power4,
              fontSize: isDesktop ? "1.3rem" : "0.8rem",
            }
          )
          .to(taskCountRef.current, {
            duration: 0.5,
            color: "#dd42f5",
            delay: -0.8,
          })
          .from(profileImageRef.current, {
            autoAlpha: 0,
            duration: 1,
            ease: Power4,
          })
          .to(headerRef.current, {
            y: "0",
            duration: 1,
            ease: Power4,
            fontSize: isDesktop ? "3rem" : "2rem",
            delay: -1,
          })
          .to(subTitleRef.current, {
            y: "0",
            duration: 1,
            ease: Power4,
            fontSize: isDesktop ? "1.1rem" : "0.8rem",
            delay: -1,
          });
      }
    );
  }, []);

  return (
    <div
      ref={bannerRef}
      className="w-fit mx-auto  text-center space-y-2 md:space-y-6"
    >
      <label htmlFor="upload" className="w-fit block mx-auto">
        <div
          ref={profileImageRef}
          className="relative  mx-auto w-24 h-24 rounded-full overflow-hidden cursor-pointer"
        >
          <Image
            className={
              "peer object-cover object-center " + (loading ? "opacity-40" : "")
            }
            src={photo}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />

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
      <div className="space-y-1 md:space-y-3">
        <div ref={headerRef} className="mx-auto text-4xl text-neutral-300">
          Welcome back,{" "}
          {authUser.username.substring(
            0,
            authUser.username.indexOf(" ") === -1
              ? authUser.username.length
              : authUser.username.indexOf(" ")
          )}
        </div>
        <div className="text-neutral-400" ref={subTitleRef}>
          You’ve got <span ref={taskCountRef}>{todos.length} tasks</span> coming
          up in the next days.
        </div>
      </div>
    </div>
  );
};

export default Welcome;
