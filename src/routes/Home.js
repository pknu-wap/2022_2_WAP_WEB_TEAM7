import {React,useState} from "react";
import "./Home.css";
import axios from 'axios'
// make state 변수 url 저장


    

function Home() {
    const [url, setUrl] = useState(null);
    function test() {
        const data=axios.post("http://192.168.0.38:8080/webKiosk/client/menu/read/",{
            market_name:'S'}).then(response=>{setUrl(response.data[0].menu_image)});
            }

    function handleClick(e) {
        
        window.location.href = "/menu"

    }
    return (
        <div className="container">
            <button id="restaurant" onClick={handleClick}>매장</button>
            <button id="packaging" onClick={handleClick}>포장</button>
            <button onClick={test}>test</button>
            <img src={"http://192.168.0.38:8080"+url}/>
        </div>
    );
}

export default Home;