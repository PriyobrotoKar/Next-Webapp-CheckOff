"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "./firebase";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

export const upload = async (file, authUser, setLoading) => {
  setLoading(true);
  const fileType = file.type.substring(
    file.type.indexOf("/") + 1,
    file.type.length
  );

  const storageRef = ref(storage, `images/${authUser.uid}.${fileType}`);
  const snapshot = await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  await updateProfile(auth.currentUser, { photoURL });
  setLoading(false);
  console.log("uploaded");
  return photoURL;
};
