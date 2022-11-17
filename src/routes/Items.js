import React from 'react';
import "./Menu.css"
function Items({TotalMenu,selectedCategory,Clicked}) {
  const url="http://127.0.0.1:8000"
  // 처음에 렌더링 될 때, 서버에서 데이터를 가져오기 전에 TotalMenu가 undefined인 경우 처리
  if(TotalMenu[selectedCategory]===null || TotalMenu[selectedCategory]===undefined){
    return "메뉴가 없습니다."
  }

  return(
    <div className="order_container">
      {TotalMenu[`${selectedCategory}`].map((Menus) => (
    <React.Fragment key={Menus.id}>
    <div className="food_container" onClick={()=> Clicked(Menus)}>
      <img src={url+Menus.menu_image} alt={Menus.menu_name} title={Menus.menu_name} />
      <div className="name">
        <strong className="ko">{Menus.menu_name}</strong>
      </div>
    </div>
    </React.Fragment>
    ))}
    </div>
  )
}
export default Items;