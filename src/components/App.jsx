import React,{useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";
import LocalStorage from "./LocalStorage";
import { v4 } from 'uuid';

function App() {

  const [value,setValue] = useState("");
  const [state,setState] = useState([]);

  function upd(event) {
    setValue(event.target.value);
  }

  function exe() {

    const input= value.trim();
    const storageItems= JSON.parse(localStorage.getItem("localData"));
    const localItems= Object.values(storageItems).map((item)=> item.toLowerCase());
    const enteredItems= state.map((item)=> item.toLowerCase());

    if (input!=="" && !enteredItems.includes(input.toLowerCase()) && !localItems.includes(input.toLowerCase())) {
       setState((prevValue)=> {
      return [value, ...prevValue];
    });
    }else if(input==="") {
      alert("Enter the proper TEXT");
    }else if(enteredItems.includes(input.toLowerCase()) || localItems.includes(input.toLowerCase())){
      alert("Already Written");
    }
    
    setValue("");
  }

  function remove(id,key) {
    setState((prevValue)=> {
      return prevValue.filter((item,index)=> index!==id);
    });

    const availableItems= JSON.parse(localStorage.getItem("localData")) || {};
    const filteredItems= Object.values(availableItems).filter((item)=> item!==key);
    let finalItems={};
    
    for(const value of filteredItems){
         finalItems[v4()]= value;
    }

    localStorage.setItem("localData", JSON.stringify(finalItems));

  }
  
  useEffect(()=> {

    const storageItems= JSON.parse(localStorage.getItem("localData")) || {};
    let inputItems={};

      for (let i = 0; i < state.length; i++) {
        if (!Object.values(storageItems).includes(state[i])) {
            inputItems[v4()]= state[i];
        }
      }

    const finalItems= {...inputItems, ...storageItems};
    localStorage.setItem("localData", JSON.stringify(finalItems));

  }, [state]);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea one={value} two={upd} three={exe}/>
      <div>
        <ul>
          {state.map((create,index)=> <TodoItem term={create} press={remove} key={index} id={index} item={create}/>)}
          <LocalStorage inputs={state}/>
        </ul>
      </div>
    </div>
  );
}

export default App;
