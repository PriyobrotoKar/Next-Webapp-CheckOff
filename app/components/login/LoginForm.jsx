"use client";
import React, { useEffect, useState } from "react";
import LoginBtn from "./LoginBtn";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm" htmlFor="">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none border border-neutral-400 p-3 rounded-xl mt-2  text-sm"
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="">
              Password
            </label>
            <input
              type="text"
              placeholder="• • • • • • • "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none border border-neutral-400 p-3 rounded-xl mt-2  text-sm"
            />
          </div>
        </div>
        <LoginBtn handleSubmit={handleSubmit} />
      </form>
      <Link href={"/signup"}>
        <div className="text-xs text-center text-purple-400 mt-4 mb-6">
          Create a new account
        </div>
      </Link>
    </>
  );
};

export default LoginForm;
