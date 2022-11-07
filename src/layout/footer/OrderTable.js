import "./OrderTable.css"





const Ordertable=(order, set_order_list)=>{
  //calculate total price
return(
<div className="tableContainer">
<table className="table">
  <thead>
    <tr id="tre">
      <th className="col">#</th>
      <th className="col">이름</th>
      <th className="col">수량</th>
      <th className="col">가격</th>
      <th className="col">수정</th>
    </tr>
  </thead>
  <tbody>
  {Object.keys(order["order"]).map((key) => {
                return (<tr id={key}> 
                  <th scope="row">{key}</th>
                    <td>{order["order"][key].menu_name}</td>
                    <td>{order["order"][key].order_count}</td>
                    <td>{order["order"][key].total_price}</td>
                    <td><button className="minus_button">-</button></td>
                    </tr>
                  )
            })}
  </tbody>
</table>
</div>
    )
};

export default Ordertable;