import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useLayoutEffect, useRef, useState } from "react";

const TodoDialog = ({
  reference,
  fetchTodos,
  setShowDialog,
  fetchCompletedTodos,
}) => {
  const [taskInput, setTaskInput] = useState({
    todoTitle: "",
    todoDesc: "",
  });
  const [showDesc, setShowDesc] = useState(false);
  const { authUser } = useAuth();

  const addTodo = async (e) => {
    if (e.key == "Enter" && e.target.value !== "") {
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          owner: authUser.uid,
          content: {
            title: taskInput.todoTitle,
            desc: taskInput.todoDesc,
          },
          completed: false,
        });
        fetchTodos();
        fetchCompletedTodos();
        setTaskInput({
          todoTitle: "",
          todoDesc: "",
        });
        setShowDesc(false);
        setShowDialog(false);

        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      ref={reference}
      className="translate-y-full opacity-0 fixed w-[50rem] rounded-xl py-6 px-8 bg-[#2D2B31BB] bottom-[15%] backdrop-blur-sm left-1/2 -translate-x-1/2"
    >
      <div className="flex gap-4 items-center">
        <div className="w-6 h-6 border-2 border-neutral-200 rounded-lg mt-0.5"></div>
        <input
          placeholder="Enter your task"
          value={taskInput.todoTitle}
          onChange={(e) =>
            setTaskInput({ ...taskInput, todoTitle: e.target.value })
          }
          onKeyUp={addTodo}
          className="bg-[#26242A] outline-none w-full px-4 py-2 rounded-lg"
          type="text"
        />
      </div>
      {showDesc && (
        <div className="mt-4 ml-10">
          <textarea
            placeholder="Description"
            value={taskInput.todoDesc}
            onChange={(e) =>
              setTaskInput({ ...taskInput, todoDesc: e.target.value })
            }
            onKeyUp={addTodo}
            className="min-h-[6rem] bg-[#26242A] outline-none w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>
      )}
      {taskInput.todoTitle && (
        <div
          onClick={() => setShowDesc(!showDesc)}
          className="ml-auto w-fit mt-4 cursor-pointer text-sm text-neutral-400 hover:text-neutral-300 transition-all duration-200"
        >
          {!showDesc ? "Add Description" : "Remove Description"}
        </div>
      )}
    </div>
  );
};

export default TodoDialog;
