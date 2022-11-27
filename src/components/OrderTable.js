import { findByLabelText } from "@testing-library/react";
import "./OrderTable.css";

const Ordertable = (props) => {
  let order = props.order;
  function editOrder(e) {
    const index = e.target.parentNode.parentNode.id;
    console.log("select id", index);
    props.editOrder(index);
  }
  //calculate total price
  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr id="tre">
            <th className="col">#</th>
            <th className="col">이름</th>
            <th className="col">수량</th>
            <th className="col">가격</th>
            <th className="col">옵션</th>
            <th className="col">수정</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(order).map((key) => {
            //옵션이 존재하는 경우 판별하는 변수
            let IsOption = false;

            if (Object.keys(order[key]).length > 3) {
              IsOption = true;
              console.log("IsOption", IsOption);
            }
            let count = 0;
            return (
              <tr id={key}>
                <th>{key}</th>
                <td>{order[key].menu_name}</td>
                <td>{order[key].order_count}</td>
                <td>{order[key].total_price}</td>
                <td style={{ display: "flex", flexDirection: "column" }}>
                  {Object.entries(order[key]).map((item) => {
                    console.log("item", item);
                    console.log("count", count);
                    if (count >= 3 && IsOption) {
                      return <label>{item[0] + ":" + item[1]}</label>;
                    }
                    count++;
                  })}
                </td>
                <td>
                  <button className="minus_button" onClick={editOrder}>
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ordertable;
