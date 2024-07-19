import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyNewComponent from "./components/MyNewComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { addTodo, toggleTodo, deleteTodo } from "./store/todoSlice";

//Creating the App Functional Component
const App: React.FC = () => {
  //Two state variables
  const [todoText, setTodoText] = useState(""); //Used to update and assign text for a Todo. Initally an empty string.
  const [currentTime, setCurrentTime] = useState<Date>(new Date()); //Used to set time for when todo was created.

  useEffect(() => {
    //This code sets up a timer that updates 'currentTime' every 1 second.
    //It updates the state variable currenTime with the current date&Time whenever the interval function is executed.
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //Creates a reference to an input element in the DOM, allowing direct manipulation of the input's properties.
  const todoInputRef = useRef<HTMLInputElement>(null);
  //Retrieves the 'todos' array from the Redux store state using a selector, making it accessible within the component's local state for rendering or further processing.
  const todos = useSelector((state: RootState) => state.todos.todos);

  //Returns the dispatch function from the Redux store.
  const dispatch = useDispatch();

  //Defined func handles adding a Todo
  const addingTodoHandler = () => {
    if (todoText.trim()) {
      //If there's whitespace that can be removed in a Todo
      //Use redux dispatch to use the addTodo reducer
      //Reset the text
      dispatch(addTodo(todoText));
      setTodoText("");

      if (todoInputRef.current) {
        todoInputRef.current.focus();
      }
    }
  };

  //Defined func handles toggling a Todo
  //Takes the id of a todo as a param
  const toggleTodoHandler = (id: number) => {
    dispatch(toggleTodo(id));
  };

  //Defined func handles how to delete a todo.
  //Takes the id  of a todo as a param.
  const deleteTodoHandler = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>Kevin's To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          ref={todoInputRef}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addingTodoHandler}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleTodoHandler(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodoHandler(todo.id)}>
              Delete Todo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
