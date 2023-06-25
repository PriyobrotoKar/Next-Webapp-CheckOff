import React, { useLayoutEffect, useRef, useState } from "react";
import Todo from "./Todo";
import { Power1, gsap } from "gsap";

const Todos = ({ todos, fetchTodos, fetchCompletedTodos }) => {
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
        stagger: 0.2,
      });
      setTimeout(() => setIsFirstLoad(false), 3000);
    }
  }, [todos]);
  return (
    <div ref={todoRef} className="w-[50rem] mx-auto space-y-6 mt-10">
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            fetchTodos={fetchTodos}
            fetchCompletedTodos={fetchCompletedTodos}
          />
        );
      })}
    </div>
  );
};

export default Todos;
