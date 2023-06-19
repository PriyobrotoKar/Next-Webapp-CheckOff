"use client";
import Image from "next/image";

import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Welcome from "./components/Welcome.jsx/Welcome";
import Navbar from "./components/Navbar";
import AddNewTodo from "./components/AddNewTodo";
import TodoDialog from "./components/createTodo/TodoDialog";
import { Power4, gsap } from "gsap";

export default function Home() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const todoDialogRef = useRef();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
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

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!todoDialogRef.current.contains(e.target)) {
        setShowDialog(false);
      }
    });
  }, []);

  return !authUser ? (
    <Loader />
  ) : (
    <div>
      <Navbar signOut={signOut} />
      <Welcome authUser={authUser} />
      <AddNewTodo showDialog={showDialog} setShowDialog={setShowDialog} />
      <TodoDialog reference={todoDialogRef} />
    </div>
  );
}
