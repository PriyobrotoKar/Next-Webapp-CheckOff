"use client";
import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/firebase";
import { CgOptions } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Power4, gsap } from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import createCategory from "@/utils/createCategory";
import { fetchAllCategories } from "@/utils/fetchCategories";
import useDraggableScroll from "use-draggable-scroll";

const CategoryTabs = ({ setTodos, categories, setCategories, fetchTodos }) => {
  const { authUser } = useAuth();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isCatEditing, setIsCatEditing] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [matchTabEdit, setMatchTabEdit] = useState(false);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [editTodos, setEditTodos] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [catId, setCatId] = useState("");
  const [error, setError] = useState("");
  const tabRef = useRef(null);
  const lineRef = useRef(null);
  const optionsBtnRef = useRef(null);
  const manageCatRef = useRef(null);
  const { onMouseDown } = useDraggableScroll(tabRef);

  const handleTabChange = async (e) => {
    setActiveTab(e.target.innerHTML);
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
      try {
        console.log("Create category");

        await createCategory(
          {
            id: authUser.uid,
            category: input,
          },
          setCatLoading,
          setError
        );
        setInput("");

        getCategories();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleSetCategory = async (cat) => {
    setInput(cat.catName);
    setIsCatEditing(true);
    setCatId(cat.id);
    activeTab === cat.catName ? setMatchTabEdit(true) : setMatchTabEdit(false);

    try {
      const q = query(
        collection(db, "todos"),
        where("owner", "==", authUser.uid),
        where("content.category", "==", `${cat.catName}`)
      );
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.id);
        console.log(doc.id, " => ", doc.data());
      });

      setEditTodos(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditCategory = async (catid) => {
    if (input !== "") {
      const catRef = doc(db, "categories", catid);
      await updateDoc(catRef, {
        catName: input,
        timestamp: new Date().getTime(),
      });

      const editingTodos = async (callback) => {
        editTodos.forEach(async (todoId) => {
          try {
            const todoRef = doc(db, "todos", todoId);
            await updateDoc(todoRef, {
              "content.category": input,
            });
            console.log(todoId, "updated");
            callback();
          } catch (error) {
            console.error(error);
          }
        });
      };

      const fetchingEditedTodos = async () => {
        try {
          console.log(input);
          console.log(activeTab);
          const q =
            activeTab !== "All"
              ? matchTabEdit
                ? (setActiveTab(input),
                  query(
                    collection(db, "todos"),
                    where("owner", "==", authUser.uid),
                    where("content.category", "==", input),
                    orderBy("timestamp", "desc")
                  ))
                : query(
                    collection(db, "todos"),
                    where("owner", "==", authUser.uid),
                    where("content.category", "==", activeTab),
                    orderBy("timestamp", "desc")
                  )
              : query(
                  collection(db, "todos"),
                  where("owner", "==", authUser.uid),
                  orderBy("timestamp", "desc")
                );
          let data = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          console.log(data);
          setTodos(data);
          setInput("");
          setEditTodos([]);
          setCatId("");
          setIsCatEditing(false);
          getCategories();
        } catch (error) {
          console.error(error);
        }
      };
      editingTodos(fetchingEditedTodos);
    } else {
    }
  };
  const handleDeleteCategory = async (cat) => {
    try {
      await deleteDoc(doc(db, "categories", cat.id));

      const q = query(
        collection(db, "todos"),
        where("owner", "==", authUser.uid),
        where("content.category", "==", `${cat.catName}`)
      );
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.id);
        console.log(doc.id, " => ", doc.data());
      });
      data.forEach(async (data) => {
        try {
          const todoRef = doc(db, "todos", data);
          await updateDoc(todoRef, {
            "content.category": "",

            timestamp: new Date().getTime(),
          });
        } catch (error) {
          console.error(error);
        }
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
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
      gsap.from(optionsBtnRef.current, {
        autoAlpha: 0,
        delay: 4,
        ease: Power4,
        duration: 1.5,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender) {
      Array.from(tabRef.current.children)[0]?.classList.add("bg-[#170a18]");
      if (tabRef.current && categories !== []) {
        console.log(tabRef.current.children);
        gsap.from(tabRef.current.children, {
          y: "30%",
          delay: 3.5,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.1,
        });
      }
      setTimeout(() => setIsFirstRender(false), 4000);
    }
  }, [categories]);
  useEffect(() => {
    console.log("hide");
    document.addEventListener("click", (e) => {
      if (optionsBtnRef.current !== null) {
        if (
          !optionsBtnRef.current.contains(e.target) &&
          manageCatRef.current !== null
        ) {
          if (!manageCatRef.current.contains(e.target)) {
            setInput("");
            setIsCatEditing(false);
            setShowOptions(false);
          }
        }
      }
    });
  }, []);
  return (
    <div className="w-[90%] md:w-[50rem] mx-auto  mt-4">
      <div className="flex justify-between items-center gap-2 relative">
        <div
          ref={tabRef}
          onMouseDown={onMouseDown}
          className="flex gap-2 md:gap-4 overflow-x-auto md:overflow-x-hidden overflow-y-hidden"
        >
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
        <button
          ref={optionsBtnRef}
          onClick={(e) => setShowOptions(!showOptions)}
          className="hover:bg-[#1c0d2c] p-2 rounded-lg"
        >
          <CgOptions className="text-xl" />
        </button>
        {showOptions && (
          <div
            ref={manageCatRef}
            className="absolute w-full md:w-[25rem] right-0 top-full bg-[#2e2d31a1] mt-2 px-4 py-6 z-40 backdrop-blur-sm rounded-lg space-y-4 shadow-lg"
          >
            <div>Manage Categories</div>
            <div className="flex justify-between items-center bg-[#232225] px-3 py-2 rounded-lg">
              <input
                value={input}
                placeholder="Create a new category"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="flex-1 w-0 bg-transparent outline-none"
                type="text"
              />
              {catLoading ? (
                <div className="w-6">
                  <img className="w-8" src="/loader2.svg" alt="" />
                </div>
              ) : isCatEditing ? (
                <button
                  onClick={() => handleEditCategory(catId)}
                  className="hover:bg-[#1c0d2c] self-stretch px-1 rounded-lg transition-colors"
                >
                  <MdModeEditOutline />
                </button>
              ) : (
                <button
                  onClick={handleCreateCategory}
                  className="hover:bg-[#1c0d2c] self-stretch px-1 rounded-lg transition-colors"
                >
                  <IoMdAdd />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-w-[20rem]">
              {categories.map((cat) => {
                if (cat.catName === "All") return;
                return (
                  <button
                    key={cat.id}
                    className="flex gap-2 items-center bg-[#302f35] px-3 py-1 rounded-lg"
                  >
                    <div
                      onClick={() => {
                        handleSetCategory(cat);
                      }}
                    >
                      {cat.catName}
                    </div>
                    <div onClick={() => handleDeleteCategory(cat)}>
                      <MdDelete className="text-red-500 hover:text-red-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <hr ref={lineRef} className="w-full  mt-4 border-[#2e2d2dbb]" />
    </div>
  );
};

export default CategoryTabs;
