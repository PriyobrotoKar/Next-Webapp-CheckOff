"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const signUpWithGoogle = async () => {
    try {
      const user = await signInWithRedirect(auth, provider);
      console.log(user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      className="flex w-full mt-6 px-4 py-3 rounded-xl gap-2 items-center border justify-center border-neutral-400"
      onClick={signUpWithGoogle}
    >
      <FcGoogle className="text-3xl" />
      <div>Login with Google</div>
    </button>
  );
};

export default GoogleLogin;
