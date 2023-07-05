import React, { useLayoutEffect, useRef, useState } from "react";
import Todo from "./Todo";
import { Power1, gsap } from "gsap";

const Todos = ({
  todos,
  fetchTodos,
  fetchCompletedTodos,
  setShowDialog,
  showDialog,
  setTodoInfo,
}) => {
  const todoRef = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useLayoutEffect(() => {
    if (isFirstLoad) {
      gsap.from(todoRef.current.children, {
        duration: 1,
        delay: 3,
        ease: Power1,
        y: "100%",
        opacity: 0,
        stagger: 0.175,
      });
      setTimeout(() => setIsFirstLoad(false), 3000);
    }
  }, [todos]);
  return (
    <div
      ref={todoRef}
      className="w-[85%] lg:w-[50rem] mx-auto space-y-6 mt-6 pb-28"
    >
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            fetchTodos={fetchTodos}
            fetchCompletedTodos={fetchCompletedTodos}
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            setTodoInfo={setTodoInfo}
          />
        );
      })}
    </div>
  );
};

export default Todos;
