import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyNewComponent from "./components/MyNewComponent";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const title = "Props Title";
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div className="App">
      <MyNewComponent title={title} />
    </div>
  );
}

export default App;
