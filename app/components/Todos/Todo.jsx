"use client";
import { db } from "@/firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { BsCheckLg } from "react-icons/bs";

const Todo = ({ todo, fetchTodos, fetchCompletedTodos }) => {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(todo.completed);
  const todoOptions = useRef();
  const handler = (e) => {
    if (todoOptions.current) {
      if (!todoOptions.current.contains(e.target)) {
        setShow(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handler, true);
    () => {
      return document.removeEventListener("click", handler, true);
    };
  }, []);

  const deleteTodo = async () => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
      fetchTodos();
      fetchCompletedTodos();
    } catch (error) {
      console.error(error);
    }
  };
  const markAsCompleted = async () => {
    setCheck(!check);
    try {
      const docRef = doc(db, "todos", todo.id);
      await updateDoc(docRef, {
        completed: !check,
      });
      fetchTodos();
      fetchCompletedTodos();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex  gap-6 font-normal bg-[#26242A] p-6 rounded-xl">
      <div
        onClick={markAsCompleted}
        className="cursor-pointer flex justify-center items-center w-6 h-6 border-2 border-neutral-200 rounded-lg mt-1"
      >
        {check && <BsCheckLg />}
      </div>
      <div
        className={
          "space-y-4 flex-1 " + (check ? "line-through text-neutral-400" : "")
        }
      >
        <div className="text-2xl">{todo.content.title}</div>
        {todo.content.desc && <div>{todo.content.desc}</div>}
      </div>
      <div>
        <div className="relative">
          <SlOptionsVertical
            className="mt-1.5 cursor-pointer"
            onClick={() => setShow(!show)}
          />
          {show && (
            <div
              ref={todoOptions}
              className="bg-[#35323ba4] backdrop-blur absolute right-0 top-full mt-2 z-20 rounded-xl py-3 w-[8rem] shadow-lg"
            >
              <div className=" px-4 py-1.5 cursor-pointer hover:bg-[#3d3942]">
                Edit
              </div>
              <div
                onClick={deleteTodo}
                className=" px-4 py-1.5 cursor-pointer hover:bg-[#3d3942] hover:text-red-500"
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
