"use client";

import { useAuth } from "@/firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import Navbar from "./components/Navbar";
import AddNewTodo from "./components/AddNewTodo";
import TodoDialog from "./components/createTodo/TodoDialog";
import { Power4, gsap } from "gsap";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Todos from "./components/Todos/Todos";
import CategoryTabs from "./components/CategoryTabs";

export default function Home() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showDialog, setShowDialog] = useState(false);
  const [isEdititng, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoInfo, setTodoInfo] = useState({
    todoTitle: "",
    todoDesc: "",
    todoCat: "",
    todoId: null,
  });
  const [showDesc, setShowDesc] = useState(false);

  const todoDialogRef = useRef();
  const fetchTodos = async () => {
    try {
      const q = query(
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
  };
  const fetchCompletedTodos = async () => {
    try {
      const q = query(
        collection(db, "todos"),
        where("owner", "==", authUser.uid),
        where("completed", "==", false)
      );
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({ ...doc.data(), id: doc.id });
      });
      setCompletedTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (authUser) {
      fetchTodos();
      fetchCompletedTodos();
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    if (showDialog) {
      gsap.to(todoDialogRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        y: "0",
        ease: Power4,
      });
    } else {
      gsap.to(todoDialogRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        y: "100%",
        ease: Power4,
      });
    }
  }, [showDialog]);

  const handler = (e) => {
    if (todoDialogRef.current !== null) {
      if (!todoDialogRef.current.contains(e.target)) {
        setShowDialog(false);
        setIsEditing(false);
        setShowDesc(false);
        setTodoInfo({
          todoTitle: "",
          todoDesc: "",
          todoCat: "",
          todoId: null,
        });
      }
    }
  };
  useEffect(() => {
    if (authUser) {
      document.addEventListener("click", handler, true);
      () => {
        return document.removeEventListener("click", handler, true);
      };
    }
  }, [authUser]);

  return !authUser ? (
    <Loader />
  ) : (
    <div className="relative min-h-[100svh]">
      <div
        className={
          " w-full min-h-full bg-[#141414bb] backdrop-blur-sm absolute inset-0 transition-all duration-200 " +
          (showDialog ? "z-20" : "opacity-0 -z-20")
        }
      ></div>
      <Navbar signOut={signOut} handler={handler} />
      <Welcome authUser={authUser} todos={completedTodos} />
      <CategoryTabs
        setTodos={setTodos}
        categories={categories}
        setCategories={setCategories}
      />
      <Todos
        todos={todos}
        fetchTodos={fetchTodos}
        fetchCompletedTodos={fetchCompletedTodos}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setTodoInfo={setTodoInfo}
      />
      <AddNewTodo showDialog={showDialog} setShowDialog={setShowDialog} />
      <TodoDialog
        reference={todoDialogRef}
        setShowDialog={setShowDialog}
        fetchTodos={fetchTodos}
        fetchCompletedTodos={fetchCompletedTodos}
        todoInfo={todoInfo}
        isEdititng={isEdititng}
        setIsEditing={setIsEditing}
        showDesc={showDesc}
        setShowDesc={setShowDesc}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
}
