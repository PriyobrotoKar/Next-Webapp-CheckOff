import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/firebase";
import createCategory from "@/utils/createCategory";
import { fetchAllCategories, fetchCategories } from "@/utils/fetchCategories";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";

const TodoDialog = ({
  reference,
  fetchTodos,
  setShowDialog,
  fetchCompletedTodos,
  todoInfo,
  setIsEditing,
  isEdititng,
  showDesc,
  setShowDesc,
}) => {
  const [taskInput, setTaskInput] = useState({
    todoTitle: "",
    todoDesc: "",
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [categories, setCategories] = useState([]);

  const { authUser } = useAuth();

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        owner: authUser.uid,
        content: {
          title: taskInput.todoTitle,
          desc: taskInput.todoDesc,
        },
        completed: false,
        timestamp: new Date().getTime(),
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
  };
  const updateTodo = async () => {
    try {
      const docRef = doc(db, "todos", todoInfo.todoId);
      await updateDoc(docRef, {
        content: {
          title: taskInput.todoTitle,
          desc: taskInput.todoDesc,
        },
      });
      fetchTodos();
      fetchCompletedTodos();
      setTaskInput({
        todoTitle: "",
        todoDesc: "",
      });
      setShowDesc(false);
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEnter = (e) => {
    if (e.key == "Enter" && e.target.value !== "") {
      if (isEdititng) {
        updateTodo();
      } else {
        addTodo();
      }
    }
  };
  const handleCreateCategory = (e) => {
    if (e.key == "Enter" && e.target.value !== "") {
      console.log("Create category");
      createCategory({
        id: authUser.uid,
        category: categoryInput,
      });
    }
  };
  const getCategories = async () => {
    const cats = await fetchAllCategories(authUser.uid);
    setCategories(cats);
  };
  useEffect(() => {
    if (todoInfo.todoId !== null) {
      setIsEditing(true);
      if (todoInfo.todoDesc) setShowDesc(true);
    }
    setTaskInput({
      todoTitle: todoInfo.todoTitle,
      todoDesc: todoInfo.todoDesc,
    });
    getCategories();
  }, [todoInfo]);

  return (
    <div
      ref={reference}
      className="translate-y-full opacity-0 z-30 fixed w-[85%] md:w-[50rem] rounded-xl px-4 py-4 md:py-6  md:px-8 bg-[#2d2b31d0] bottom-[15%] backdrop-blur-sm left-1/2 -translate-x-1/2"
    >
      <div className="flex gap-4 items-center">
        <div className="w-6 h-[1.4rem] md:h-6 border-2 border-neutral-200 rounded-lg mt-0.5"></div>
        <input
          placeholder="Enter your task"
          value={taskInput.todoTitle}
          onChange={(e) =>
            setTaskInput({ ...taskInput, todoTitle: e.target.value })
          }
          onKeyUp={handleEnter}
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
            onKeyDown={handleEnter}
            className="min-h-[6rem] bg-[#26242A] outline-none w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>
      )}
      <div className="flex gap-3 mt-2 items-center">
        <button
          onClick={(e) => setIsAddingCat(!isAddingCat)}
          className="w-7 h-[1.4rem] cursor-pointer md:h-7 bg-[#26242A] rounded-lg mt-0.5 flex justify-center items-center"
        >
          <IoMdAdd className="text-xl" />
        </button>
        {isAddingCat ? (
          <div>
            <input
              type="text"
              className="bg-[#26242A] text-sm outline-none  px-4 py-2 rounded-lg"
              onKeyUp={handleCreateCategory}
              value={categoryInput}
              placeholder="Create a new Category"
              onChange={(e) => setCategoryInput(e.target.value)}
            />
          </div>
        ) : (
          <div className="text-black">
            <select
              name=""
              id=""
              className="w-[13rem] px-2 py-1.5 rounded-lg bg-[#26242A] text-neutral-300"
            >
              <option value="">None</option>
              {categories.map((cat) => {
                return <option value={cat.catName}>{cat.catName}</option>;
              })}
            </select>
          </div>
        )}
      </div>
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
