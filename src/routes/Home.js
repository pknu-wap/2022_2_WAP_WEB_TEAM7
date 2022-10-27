import React from "react";
import "./Home.css";

function Home() {
    function handleClick(e) {
        window.location.href = "/menu"
    }
    return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>매장</button>
            <button id="packaging" onClick={handleClick}>포장</button>
        </div>
    );
}

export default Home;