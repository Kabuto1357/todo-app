import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addTodo } from "../store/todoSlice";

type MyNewComponentProps = {
  title: string;
};
function MyNewComponent(props: MyNewComponentProps) {
  const [count, setCount] = useState(0);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Count changed");
  }, [count]);

  return (
    <div style={{ fontSize: 50 }}>
      What is the count?: {count}
      <br></br>
      <div>
        <button
          style={{ color: "blue" }}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>
        <button
          style={{ color: "red" }}
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Decrement
        </button>

        <div>
          <button
            onClick={() => {
              dispatch(addTodo("My new todo item"));
            }}
          >
            Add Todo Item
          </button>
          <div>Todo Items:</div>
          {todos.map((todo) => {
            return <div>{todo.text}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default MyNewComponent;
