"use client";
import { db } from "@/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { useAuth } from "@/firebase/auth";

const Todo = ({
  todo,
  fetchTodos,
  fetchCompletedTodos,
  setShowDialog,
  showDialog,
  setTodoInfo,
  activeTab,
  setTodos,
}) => {
  const { authUser, isLoading, signOut } = useAuth();
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(todo.completed);

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

      fetchCompletedTodos();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    setShow(!show);
    setShowDialog(!showDialog);
    setTodoInfo({
      todoTitle: todo.content.title,
      todoDesc: todo.content.desc,
      todoCat: todo.content.category,
      todoId: todo.id,
    });
  };
  return (
    <div className="flex group/todo gap-6 font-normal bg-[#26242A] p-4 md:p-6 rounded-xl hover:shadow-xl shadow-[#000] transition-shadow duration-200 cursor-pointer">
      <div
        onClick={markAsCompleted}
        className="cursor-pointer flex justify-center items-center w-6 h-6 border-2 border-neutral-200 hover:border-neutral-400 rounded-lg mt-1"
      >
        {check && <BsCheckLg />}
      </div>
      <div onClick={handleEdit} className="space-y-2 flex-1 ">
        <div
          className={
            "text-xl md:text-2xl " +
            (check ? "line-through text-neutral-400" : "")
          }
        >
          {todo.content.title}
        </div>
        {todo.content.desc && (
          <div
            className={
              "text-sm line-clamp-1 " +
              (check ? "line-through text-neutral-400" : "")
            }
          >
            {todo.content.desc}
          </div>
        )}
        {todo.content.category && (
          <div
            className={
              "border border-[#EFB8C8] text-[#EFB8C8] rounded-lg px-2 py-1 text-sm w-fit " +
              (check ? "border-[#b4949d] text-[#b4949d]" : "")
            }
          >
            {todo.content.category}
          </div>
        )}
      </div>
      <div>
        <div
          onClick={deleteTodo}
          className="relative z-30 hover:bg-[#270808] group/delete transition-all duration-200 rounded-lg p-2"
        >
          <MdDelete className="text-xl opacity-100 lg:opacity-0 group-hover/todo:opacity-100 group-hover/delete:text-red-700 transition-all duration-200  cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
