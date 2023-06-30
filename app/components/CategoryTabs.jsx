"use client";
import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/firebase";
import { fetchAllCategories, fetchCategories } from "@/utils/fetchCategories";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Power4, gsap } from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const CategoryTabs = ({ setTodos, categories, setCategories }) => {
  const { authUser } = useAuth();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const tabRef = useRef(null);
  const lineRef = useRef(null);

  const handleTabChange = async (e) => {
    Array.from(tabRef.current.children).forEach((element) => {
      element.classList.remove("bg-[#170a18]");
    });
    e.target.classList.add("bg-[#170a18]");

    try {
      const q =
        e.target.innerHTML !== "All"
          ? query(
              collection(db, "todos"),
              where("owner", "==", authUser.uid),
              where(
                "content.category",
                "==",
                e.target.innerHTML === "All" ? "" : `${e.target.innerHTML}`
              ),
              orderBy("timestamp", "desc")
            )
          : query(
              collection(db, "todos"),
              where("owner", "==", authUser.uid),
              orderBy("timestamp", "desc")
            );
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    } catch (error) {
      console.error(error);
    }

    // setTodos(result);
  };
  useLayoutEffect(() => {
    if (isFirstRender) {
      gsap.from(lineRef.current, {
        width: "0%",
        delay: 3.5,
        duration: 1,
        ease: Power4,
      });
    }
  }, []);

  useLayoutEffect(() => {
    Array.from(tabRef.current.children)[0]?.classList.add("bg-[#170a18]");
    if (isFirstRender) {
      if (tabRef.current && categories !== []) {
        console.log(tabRef.current.children);
        gsap.from(tabRef.current.children, {
          y: "30%",
          delay: 3,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.1,
        });
      }
      setTimeout(() => setIsFirstRender(false), 4000);
    }
  }, [categories]);
  return (
    <div className="w-[50rem] mx-auto  mt-4">
      <div ref={tabRef} className="flex gap-4">
        {categories.map((cat, ind) => {
          return (
            <button
              key={ind}
              onClick={handleTabChange}
              className="px-3 py-2 bg-[#141414bb] rounded-xl hover:bg-[#1c0d2c] transition-colors duration-200"
            >
              {cat.catName}
            </button>
          );
        })}
      </div>

      <hr ref={lineRef} className="w-full  mt-4 border-[#2e2d2dbb]" />
    </div>
  );
};

export default CategoryTabs;
