import "./MoreInformation.css"

function MoreInformation({ menuLists, setwindow }) {
    return (
        <div className="information_container">
            <div className="information_header">
                <button onClick={()=>setwindow(false)}>X</button>
            </div>
            <div className="information_menu_list">
                {JSON.parse(`${menuLists.menu_list}`).map((list) => (
                        <div>
                            <span>{list.menu_name} </span>
                            <span>{list.order_count} </span>
                            <span>{list.total_price} </span>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default MoreInformation