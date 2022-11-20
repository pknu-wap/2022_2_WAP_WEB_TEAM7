import React from "react";
import "./GoHome.css"

function firstClick(e) {
    window.location.href = "/"
  }
  
function GoHome() {
    return (
        <div id="first">
            <button onClick={firstClick}>처음으로</button>
        </div>
    )
}

export default GoHome