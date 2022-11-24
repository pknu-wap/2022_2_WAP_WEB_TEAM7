import axios from "axios";

export async function DelMenu(OldMenuList, delMenu, SelectTap) {
  console.log("OldMenuList", OldMenuList);
  console.log("delMenu", delMenu);
  console.log("SelectTap", SelectTap);
  // 지울 요소를 없앤 메뉴 배열
  let NewMenuList = [];
  Object.values(OldMenuList).map((menu) => {
    console.log("menu", menu);
    if (menu.menu_name !== delMenu) {
      NewMenuList.push(`"${menu.menu_name}"`);
    }
  });

  await axios
    .post("http://127.0.0.1:8000/webKiosk/client/meca/management/", {
      market_name: "S",
      category_name: `${SelectTap}`,
      menu_set: `[${NewMenuList}]`,
    })
    .then((response) => {
      console.log("response", response);
    });
  window.location.reload();
}
