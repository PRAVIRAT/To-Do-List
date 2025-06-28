import React,{useState} from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";

function App() {

  const [value,setValue] = useState();
  const [state,setState] = useState([]);

  function upd(event) {
    setValue(event.target.value);
  }

  function exe() {

    if (value.trim()!=="") {
       setState((prevValue)=> {
      return [...prevValue,value];
    });
    }

    if (value.trim()==="") {
      alert("Enter the proper TEXT");
    }
    
    setValue("");
  }

  function remove(id) {
    setState((prevValue)=> {
      return prevValue.filter((item,index)=> index!==id);
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea one={value} two={upd} three={exe}/>
      <div>
        <ul>
          {state.map((create,index)=> <TodoItem term={create} press={remove} key={index} id={index}/>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
