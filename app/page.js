"use client";
import Image from "next/image";

import { useAuth } from "@/firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Welcome from "./components/Welcome.jsx/Welcome";
import Navbar from "./components/Navbar";
import AddNewTodo from "./components/AddNewTodo";
import TodoDialog from "./components/createTodo/TodoDialog";
import { Power4, gsap } from "gsap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Todos from "./components/Todos/Todos";
import { data } from "autoprefixer";

export default function Home() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showDialog, setShowDialog] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const todoDialogRef = useRef();
  const fetchTodos = async () => {
    try {
      const q = query(
        collection(db, "todos"),
        where("owner", "==", authUser.uid)
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
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handler, true);
    () => {
      return document.removeEventListener("click", handler, true);
    };
  }, []);

  return !authUser ? (
    <Loader />
  ) : (
    <div>
      <Navbar signOut={signOut} handler={handler} />
      <Welcome authUser={authUser} todos={completedTodos} />
      <Todos
        todos={todos}
        fetchTodos={fetchTodos}
        fetchCompletedTodos={fetchCompletedTodos}
      />
      <AddNewTodo showDialog={showDialog} setShowDialog={setShowDialog} />
      <TodoDialog
        reference={todoDialogRef}
        setShowDialog={setShowDialog}
        fetchTodos={fetchTodos}
        fetchCompletedTodos={fetchCompletedTodos}
      />
    </div>
  );
}
