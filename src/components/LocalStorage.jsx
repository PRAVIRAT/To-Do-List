import React, { useEffect, useState } from "react";
import {v4} from "uuid";

const LocalStorage= ({inputs})=> {

    const [items,setItems]= useState({});

    const obj= {
        item1: "Do Exercise",
        item2: "Learn Coding",
        item3: "Watch Movies"
    };

    useEffect(()=> {
        if (!localStorage.getItem("localData")) {
            localStorage.setItem("localData", JSON.stringify(obj));
        }
        setItems(JSON.parse(localStorage.getItem("localData")));
    }, []);

    const removeItems= (id,key)=> {
        setItems((prevValue)=> {
            return Object.values(prevValue).filter((item,index)=> index!==id);
        });

        const availableItems= {...items};
        delete availableItems[key];

        const localInputs={};

        for (let i = 0; i < inputs.length; i++) {
            if (!Object.values(availableItems).includes(inputs[i])) {
                localInputs[v4()]= inputs[i];
            }
        }

        const finalItems= {...localInputs, ...availableItems}
        localStorage.setItem("localData", JSON.stringify(finalItems));
    }

    return (<div>
        {Object.entries(items).map(([key,value],index)=> {
            return (<li key={index} onClick={()=> removeItems(index,key)}> {value} </li>)
        })}
    </div>);

}

export default LocalStorage;