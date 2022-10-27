const Design={
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#menu_detail_img {
    background-color: rgb(190, 212, 127);
    overflow: hidden;
    position : center;
    width : 100px;
    height: 100px;
    margin-right :20px; 
  }
  
  .select_menu{
    display : flex;
    flex-direction: row;
    justify-content : center;
    /*align center/\
    */
  }
  
  
  #menu_info{
    display : flex;
    flex-direction: column;
    /*align column deraction*/
  }
  
  #menu_price{
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
  }
  #menu_price.label{
    vertical-align: middle;
  }
  
  #clickerbutton{
    margin-right : 10px;
    display : flex;
    align-items: center;
    
  }
  #select_price{
    width : 200px;
    text-align: center;
  }

}