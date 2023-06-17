"use client";
import Image from "next/image";

import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { useEffect } from "react";
import Welcome from "./components/Welcome.jsx/Welcome";
import Navbar from "./components/Navbar";

export default function Home() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
  }, [authUser, isLoading]);

  return !authUser ? (
    <Loader />
  ) : (
    <div>
      <Navbar signOut={signOut} />
      <Welcome authUser={authUser} />
    </div>
  );
}
