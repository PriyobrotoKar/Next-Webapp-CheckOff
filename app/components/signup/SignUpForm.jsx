"use client";
import React, { useState } from "react";
import SignUpBtn from "./SignUpBtn";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/firebase/auth";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuth();

  const handleSubmit = async () => {
    if (!username || !email || !password) return;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: username });
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
        image: "/avatar.jpg",
      });

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
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full bg-transparent outline-none border border-neutral-400 p-3 rounded-xl mt-2  text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email Address"
              className="w-full bg-transparent outline-none border border-neutral-400 p-3 rounded-xl mt-2  text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="• • • • • • • "
              className="w-full bg-transparent outline-none border border-neutral-400 p-3 rounded-xl mt-2  text-sm"
              required
            />
          </div>
        </div>
        <SignUpBtn handleSubmit={handleSubmit} />
      </form>

      <div className="text-xs text-center text-neutral-400 mt-4 mb-6">
        Already have an account?
        <Link href={"/login"} className="text-purple-400">
          Login
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
