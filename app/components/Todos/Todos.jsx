import React from "react";
import Todo from "./Todo";

const Todos = ({ todos, fetchTodos, fetchCompletedTodos }) => {
  return (
    <div className="w-[50rem] mx-auto space-y-6 mt-10">
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
