import "./MoreInformation.css"

function MoreInformation({ menuLists, setwindow }) {

    const menuList = JSON.parse(`${menuLists.menu_list}`);

    return (
        <div className="information_container">
            <div className="information_header">
                <span>주문 상세내역</span>
                <button onClick={()=>setwindow(false)}>X</button>
            </div>
            <div className="information_menu_list">
                <div>
                    <div className="inf_one">
                        {menuLists.order_num}번. {menuLists.take_out ? "테이크아웃" : "매장내식사"}
                    </div>
                    <div className="inf_two">
                        <div>
                            주문일시 : {menuLists.create_date}
                        </div>
                        <div>
                            총 가격 : {menuLists.all_price}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="inf_three">
                        <span>메뉴</span>
                        <span>수량</span>
                        <span>가격</span>
                        <span>옵션</span>
                    </div>
                    {Object.keys(menuList).map((key) => {
                        let count = 0
                        return (
                            <div className="inf_four">
                                <span>{menuList[key].menu_name} </span>
                                <span>{menuList[key].order_count} </span>
                                <span>{menuList[key].total_price} </span>
                                <span>
                                {Object.entries(menuList[key]).map((item)=>{
                                    if (count >= 3) {
                                        return <label>{item[0] + " : " + item[1]}<br/></label>;
                                    }
                                    count++;
                                })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default MoreInformation