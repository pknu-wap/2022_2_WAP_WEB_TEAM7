import "./Accept.css"
import axios from "axios";

function Accept({ menuLists, setwindow }) {

    function close(e) {
        window.location.href = "/current_order"
    }

    const old_list = {
        id: menuLists.id,
        market_name: menuLists.market_name,
        table_num: menuLists.table_num,
        order_num: menuLists.order_num,
        menu_list: menuLists.menu_list,
        all_price: menuLists.all_price,
        create_date: menuLists.create_date,
        is_new: menuLists.is_new,
        take_out: menuLists.take_out,
        is_accepted: menuLists.is_accepted
    }
    
    const new_list = {
        id: menuLists.id,
        market_name: menuLists.market_name,
        table_num: menuLists.table_num,
        order_num: menuLists.order_num,
        menu_list: menuLists.menu_list,
        all_price: menuLists.all_price,
        create_date: menuLists.create_date,
        is_new: menuLists.is_new,
        take_out: menuLists.take_out,
        is_accepted: true
    }

    const done_list = {
        id: menuLists.id,
        market_name: menuLists.market_name,
        table_num: menuLists.table_num,
        order_num: menuLists.order_num,
        menu_list: menuLists.menu_list,
        all_price: menuLists.all_price,
        create_date: menuLists.create_date,
        is_new: false,
        take_out: menuLists.take_out,
        is_accepted: menuLists.is_accepted
    }

    async function AcceptOrder() {
        const url="http://127.0.0.1:8000/webKiosk/client/order/treat/"
        try {
            axios.post(url,
            {
                market_name: menuLists.market_name,
                old_order: JSON.stringify(old_list),
                new: JSON.stringify(new_list)
            })
        } catch(e) {
            console.error(e)
        }
    }

    async function Done() {
        const url="http://127.0.0.1:8000/webKiosk/client/order/treat/"
        try {
            axios.post(url,
            {
                market_name: menuLists.market_name,
                old_order: JSON.stringify(old_list),
                new: JSON.stringify(done_list)
            })
        } catch(e) {
            console.error(e)
        }
    }

    function Frist() {
        return (
            <div>
                <button id="acc" onClick={()=>{close(); AcceptOrder();}}>주문수락</button>
                <button id="rej" onClick={()=>{close(); Done();}}>주문거부</button>
            </div>
        )
    }

    function Second() {
        return (
            <div>
                <button id="done" onClick={()=>{close(); Done();}}>수령완료</button>
            </div>
        )
    }

    let content = null;
    if (!menuLists.is_accepted) {
        content = <Frist/>
    }
    else {
        content = <Second/>
    }

    return (
        <div>
            <div className="accept_header">
                <span>주문 접수화면</span>
                <button onClick={()=>setwindow(false)}>X</button>
            </div>
            {content}
        </div>
    )
}


export default Accept;