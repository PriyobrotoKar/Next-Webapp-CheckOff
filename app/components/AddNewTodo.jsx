import React from "react";
import { MdModeEditOutline } from "react-icons/md";

const AddNewTodo = ({ setShowDialog, showDialog }) => {
  return (
    <button
      onClick={() => setShowDialog(!showDialog)}
      className="absolute z-10 bottom-10 left-1/2 -translate-x-1/2 rounded-2xl items-center flex gap-2 p-4 bg-[#4F378B] shadow-md shadow-[#00000071]"
    >
      <MdModeEditOutline className="text-xl" />
      <div className="text-sm">Add a New Task</div>
    </button>
  );
};

export default AddNewTodo;
