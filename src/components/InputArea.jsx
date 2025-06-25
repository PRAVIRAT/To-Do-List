import React from "react";

function InputArea(props) {
    return (<div className="form">
        <input type="text" value={props.one} onChange={props.two}/>
        <button onClick={props.three}>
          <span>Add</span>
        </button>
      </div>);
}

export default InputArea;