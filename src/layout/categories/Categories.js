import "./Categories.css";
import {useState} from 'react'
import {Link} from 'react-router-dom'

function Categories() {
    const [isSelected, select] = useState('Current')

    console.log({isSelected})
    return (
        <div className="category_container">
            <ol>
                <li className={isSelected === "Current" ? "selected" : "categories"} onClick={()=>{select('Current');}}>
                    <Link to="/current_order">현재 주문</Link>
                </li>
                <li className={isSelected === "Past" ? "selected" : "categories"} onClick={()=>{select('Past');}}>
                    <Link to="/past_order">지난 주문</Link>
                </li>
                <li className={isSelected === "Modify" ? "selected" : "categories"} onClick={()=>{select('Modify');}}>
                    <Link to="/menu_modify">메뉴 수정</Link>
                </li>
            </ol>
        </div>
    )
}

export default Categories;