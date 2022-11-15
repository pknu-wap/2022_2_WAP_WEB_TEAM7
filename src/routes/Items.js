function Items({TotalMenu,selected_menu}) {
  if(TotalMenu===null || TotalMenu===undefined){
    console.log("items",TotalMenu)
    return "메뉴가 없습니다."
  }
  console.log("items",TotalMenu)
  console.log("selected_menu",selected_menu)
  return(
    <div className="order_container">
      {
        Object.values(TotalMenu).map((menu) => (
        console.log("items",menu)
      ))}
    </div>
  )
}
export default Items;