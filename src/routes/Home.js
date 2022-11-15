import {React,useState,useEffect} from "react";
import "./Home.css";
import axios from 'axios'

function Home() {
    // 카테고리 목록을 담을 state 변수
    const [category, set_category] = useState("");
    // 메뉴 목로을 담을 state 변수
    
    const [url, setUrl] = useState(null);
    function test() {
        const data=axios.post("http://127.0.0.1:8000/webKiosk/client/menu/read/",{
            market_name:'S'
            }).then(response=>{console.log(response.data)});
            }

    function handleClick(e) {
        
        window.location.href = "/menu"
    }

    return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>매장</button>
            <button id="packaging" onClick={handleClick}>포장</button>
            <button onClick={test}>test</button>
            <img src={"http://192.168.0.38:8000"+url}/>
            <div>{JSON.stringify("")}</div>
        </div>
    );
}

export default Home;