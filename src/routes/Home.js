import {React,useState,useEffect} from "react";
import "./Home.css";
import axios from 'axios'
import logo from '../image/logo8.PNG';

function Home() {
    // 카테고리 목록을 담을 state 변수
    const [category, set_category] = useState("");
    // 메뉴 목로을 담을 state 변수
    
    const [url, setUrl] = useState(null);
    function test() {
        const data=axios.post("http://127.0.0.1:8000/webKiosk/client/option/read/",{
            market_name : 'S'
        })
           .then(response=>{console.log(response.data)});
            }
    

    function handleClick(e) {
        const eating = false;
        window.location.href = "/menu";
    }

    /*function TakeoutClick(e) {
        const eating = true;
        window.location.href = "/menu";
    }*/



/*    return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>매장</button>
            <button id="packaging" onClick={TakeoutClick}>포장</button>
            <button onClick={test}>test</button>
            <img src={"http://192.168.0.38:8000"+url}/>
            <div>{JSON.stringify("")}</div>
        </div>
    );
}*/

     return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>주문하기</button>
            <img src = {logo} id ="kioskLogo" />
        </div>
    );
}

export default Home;