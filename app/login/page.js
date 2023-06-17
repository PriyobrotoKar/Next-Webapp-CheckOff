"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import GoogleLogin from "../components/signup/GoogleLogin";
import LoginForm from "../components/login/LoginForm";
import LoginBanner from "../components/login/LoginBanner";
import Loader from "../components/Loader";

const page = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);
  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <div className="w-[25rem] px-10 rounded-3xl overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#26242A]">
      <LoginBanner />
      <GoogleLogin />
      <div className="flex gap-2 items-center mt-6">
        <div className="h-[0.1rem] bg-neutral-600 flex-1"></div>
        <div className="text-center text-neutral-500">OR</div>
        <div className="h-[0.1rem] bg-neutral-600 flex-1"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default page;
