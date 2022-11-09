import React from "react";
import "./Home.css";
import axios from 'axios'
function test() {
    axios.post("http://192.168.0.38:8080/webKiosk/client/menu/read/",{
        market_name:'S'}).then(response=>{console.log(response);
        })
    }

function Home() {
    function handleClick(e) {
        
        window.location.href = "/menu"

    }
    return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>매장</button>
            <button id="packaging" onClick={handleClick}>포장</button>
            <button onClick={test}>test</button>
        </div>
    );
}

export default Home;