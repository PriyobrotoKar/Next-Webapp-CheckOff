"use client";
import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/firebase";
import { CgOptions } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Power4, gsap } from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import createCategory from "@/utils/createCategory";
import { fetchAllCategories } from "@/utils/fetchCategories";

const CategoryTabs = ({ setTodos, categories, setCategories }) => {
  const { authUser } = useAuth();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [catLoading, setCatLoading] = useState(false);
  const [input, setInput] = useState("");
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
  const getCategories = async () => {
    const cats = await fetchAllCategories(authUser.uid);
    if (cats) {
      setCategories([{ catName: "All" }, ...cats]);
    }
  };
  const handleCreateCategory = async () => {
    if (input !== "") {
      console.log("Create category");

      await createCategory(
        {
          id: authUser.uid,
          category: input,
        },
        setCatLoading
      );
      setInput("");

      getCategories();
    }
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
      <div className="flex justify-between items-center relative">
        <div ref={tabRef} className="flex gap-4 overflow-x-hidden">
          {categories.map((cat, ind) => {
            return (
              <button
                key={ind}
                onClick={handleTabChange}
                className="px-3 py-2 min-w-fit bg-[#141414bb] rounded-xl hover:bg-[#1c0d2c] transition-colors duration-200"
              >
                {cat.catName}
              </button>
            );
          })}
        </div>
        <button className="hover:bg-[#1c0d2c] p-2 rounded-lg">
          <CgOptions className="text-xl" />
        </button>
        <div className="absolute right-0 top-full bg-[#2e2d31a1] mt-2 px-4 py-6 z-40 backdrop-blur-sm rounded-lg space-y-4 shadow-lg">
          <div>Manage Categories</div>
          <div className="flex justify-between items-center bg-[#232225] px-3 py-2 rounded-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              type="text"
            />
            <button
              onClick={handleCreateCategory}
              className="hover:bg-[#1c0d2c] self-stretch px-1 rounded-lg transition-colors"
            >
              <IoMdAdd />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-w-[20rem]">
            {categories.map((cat, ind) => {
              if (cat.catName === "All") return;
              return (
                <button className="flex gap-2 items-center bg-[#302f35] px-3 py-1 rounded-lg">
                  <div>{cat.catName}</div>
                  <div>
                    <MdDelete className="text-red-600" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <hr ref={lineRef} className="w-full  mt-4 border-[#2e2d2dbb]" />
    </div>
  );
};

export default CategoryTabs;
