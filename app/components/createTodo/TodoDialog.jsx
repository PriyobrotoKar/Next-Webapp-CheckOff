import React, { useLayoutEffect, useRef, useState } from "react";

const TodoDialog = ({ reference }) => {
  const [taskInput, setTaskInput] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      ref={reference}
      className="translate-y-full opacity-0 absolute w-[50rem] rounded-xl py-6 px-8 bg-[#2D2B31BB] bottom-[15%] backdrop-blur-sm left-1/2 -translate-x-1/2"
    >
      <div className="flex gap-4 items-center">
        <div className="w-4 h-4 border border-neutral-200 rounded-[0.15rem]"></div>
        <input
          placeholder="Enter your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="bg-[#26242A] outline-none w-full px-4 py-2 rounded-lg"
          type="text"
        />
      </div>
      {showDesc && (
        <div className="mt-4 ml-7">
          <textarea
            placeholder="Description"
            className="min-h-[6rem] bg-[#26242A] outline-none w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>
      )}
      {taskInput && (
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
