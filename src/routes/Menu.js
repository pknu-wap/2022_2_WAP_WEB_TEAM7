import React, {useState} from "react";
import "./Menu.css";
import gimbap_list from "../food/gimbap_list.json"
import ramyeon_list from "../food/ramyeon_list.json"
import tteokbokki_list from "../food/tteokbokki_list.json"
import side_list from "../food/side_list.json"
import Footer from "../layout/footer/Footer";
  
function Menu({foodname, onCreate}) {
  const [inputs, setInputs] = useState({
    dialog: 0,
    number: 1,
  });
  const gimbapList = gimbap_list;
  const ramyeonList = ramyeon_list;
  const tteokbokkiList = tteokbokki_list;
  const sideList = side_list;

  const onClick = (id) => {
    setInputs({
      ...inputs,
      dialog: id,
      onSet: false,
      number: 1,
    });
  };

  const onConfirm = (foodId, name, price, number, onSet) => {
    console.log("확인");
    onCreate(foodId, name, price, number, onSet);
    setInputs({
      dialog: 0,
      onSet: false,
      number: 1,
    });
  };

  const onCancel = () => {
    console.log("취소");
    setInputs({
      dialog: 0,
      onSet: false,
      number: 1,
    });
  };

function Gimbap() {
  return(
    <div className="order_container">
      {gimbapList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={() => onClick(menu.id)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    </div>
  )
}

function Ramyeon() {
  return(
    <div className="order_container">
      {ramyeonList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={() => onClick(menu.id)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    </div>
  )
}

function Tteokbokki() {
  return(
    <div className="order_container">
      {tteokbokkiList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={() => onClick(menu.id)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    </div>
  )
}

function Side() {
  return(
    <div className="order_container">
      {sideList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={() => onClick(menu.id)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    </div>
  )
}

    const [mode, setMode] = useState('gimbap');
    let content = null;
    if(mode === 'gimbap'){
      content = <Gimbap/>
    } else if(mode === 'ramyeon'){
      content = <Ramyeon/>
    } else if(mode === 'tteokbokki'){
      content = <Tteokbokki/>
    } else if(mode === 'side'){
      content = <Side/>
    }
  
    return (
        <div>
          <div className="categories">
            <button onClick={()=>{setMode('gimbap');}}>김밥</button>
            <button onClick={()=>{setMode('ramyeon');}}>라면</button>
            <button onClick={()=>{setMode('tteokbokki');}}>떡볶이</button>
            <button onClick={()=>{setMode('side');}}>사이드</button>
            </div>
            {content}
            <Footer/>
        </div>
    )
  }  

  export default Menu;