import React from "react";

function TodoItem(props) {
    return (<div onClick={()=> {
        props.press(props.id)
    }}><li>{props.term}</li></div>);
}

export default TodoItem;