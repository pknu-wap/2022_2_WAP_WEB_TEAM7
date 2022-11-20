import "./OrderTable.css"


const Ordertable=(props)=>{
  let order=props.order
  function editOrder(e){
    const index=e.target.parentNode.parentNode.id
    console.log("select id", index)
    props.editOrder(index)
  }
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
  {Object.keys(order).map((key) => {
                return (<tr id={key}> 
                  <th>{key}</th>
                    <td>{order[key].menu_name}</td>
                    <td>{order[key].order_count}</td>
                    <td>{order[key].total_price}</td>
                    <td><button className="minus_button" onClick={editOrder}>-</button></td>
                    </tr>
                  )
            })}
  </tbody>
</table>
</div>
    )
};


export default Ordertable;