from django.shortcuts import render
from .models import *
from .serializers import *
import json
import bcrypt
from datetime import date, timedelta
from random import randint
def get_name(model):
    if model==Category or model==Meca:
        name='category_name'
    if model==Option:
        name='option_name'
    if model==Menu or model==Opme:
        name='menu_name'
    return name
def get_name_set(model):
    if model==Menu:
        name_set='menu_set'
    elif model==Option:
        name_set='option_set'
    return name_set
def get_dic(account,model,**vargs):
    dic={"account":account}
    name=get_name(model)
    try:dic[name]=vargs[name]
    except:#비장의 수단
        for va in vargs:
            dic[va]=vargs[va]
    return dic
def Hash(serializer):
    password=serializer.data["password"]
    encoded_password=password.encode('utf-8')
    hashed_password=bcrypt.hashpw(encoded_password, bcrypt.gensalt())
    decoded_password=hashed_password.decode('utf-8')
    return decoded_password
def check_userid(serializer):
    userid=serializer.data['userid']
    errormessage="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
    if len(userid)<5 or len(userid)>20: return errormessage
    for I in userid:
        if I.isdigit or I.isalpha or I in ["-","_"]:
            continue
        else: return errormessage
    if userid.islower()!=False:return errormessage
    return False
def check_password_safe(serializer):
    password=serializer.data['password']
    if len(password)<8:return "8자 이상이어야 합니다."
    i=0
    alpha=0
    for P in password:
        if P in ["!","@","#","$","%","^","&","*"]:
            break
        if (P.isalpha() or P.isdigit() or P in ["!","@","#","$","%","^","&","*"])!=True:
            return "영문, 숫자, !@#$%^&*만 입력가능합니다."
        if P.isalpha():alpha+=1
        i+=1
    if alpha<4:return "영문을 4글자 이상 입력해야합니다."
    if i==len(password):return "!@#$%^&*은 하나 이상 입력되어야 합니다."
    if password.isdigit()==True:return "문자도 입력되어야 합니다."
    if password.isalpha()==True:return "숫자도 입력되어야 합니다."
    if password.islower()==True or password.isupper()==True:
        return "대문자와 소문자는 각각 1개이상 입력되어야합니다."
    return False
     
def json_to_dict(serializer):#GetData용
    dictionary=serializer.data["data"]
    dictionary=json.loads(dictionary)
    return dictionary
def is_id_exist(serializer):
    the_id=serializer['data']
    try:
        Account.objects.get(user_id=the_id)
        return True
    except: return False
def get_obj(model,**vargs):
    try:obj=model.objects.get(**vargs)
    except: return None
    return obj
def get_account_object(serializer):
    market_name=serializer.data['market_name']
    try:account=Account.objects.get(market_name=market_name)
    except:return None
    return account
def get_category_object(account,serializer):
    category_name=serializer.data['category_name']
    try:category=Category.objects.get(account=account,category_name=category_name)
    except:return None
    return category
def get_menu_object(account,serializer):
    menu_name=serializer.data['menu_name']
    try:menu=Menu.objects.get(account=account,menu_name=menu_name)
    except:return None
    return menu
def get_obj_list(account,model,serializer):
    name_set=get_name_set(model)
    name=get_name(model)
    obj_set=serializer.data[name_set]
    dic={"account":account}
    obj_list=[]
    try:
        obj_set=json.loads(obj_set)
        dic={"account":account}
        for obj_name in obj_set:
            dic[name]=obj_name
            obj=model.objects.get(**dic)
            obj_list.append(obj)
    except:return None
    return obj_list
def get_menu_list(account,serializer):
    menu_set=serializer.data['menu_set']
    menu_list=[]
    try:
        menu_set=json.loads(menu_set)
        for menu_name in menu_set:
            menu=Menu.objects.get(account=account,menu_name=menu_name)
            menu_list.append(menu)
    except:return None
    return menu_list
def get_option_list(account,serializer):
    option_set=serializer.data['option_set']
    option_list=[]
    try:
        option_set=json.loads(option_set)
        for option_name in option_set:
            option=Option.objects.get(account=account,option_name=option_name)
            option_list.append(option)
    except:return None
    return option_list
def get_perfect_order_object(account,serializer):
    data=serializer.data
    try:
        order=Order.objects.get(
            account=account,
            menu_list=data['menu_list'],
            create_date=data['create_date'],
            all_price=data['all_price'],
            is_new=data['is_new'],
            take_out=data['take_out'],
        )
    except: order=None
    return order 
def get_old_new_data(serializer):
    data=serializer.data
    old_data=data['old_name']
    new_data=data['new']
    return old_data,new_data
def Save(model,account,**vargs):
    data=model(account=account,**vargs)
    data.save()
def CategorySave(account,data):
    category=Category(
        account=account,
        market_name=data['market_name'],
        category_name=data['category_name'],
        priority=data['priority'],
    )
    category.save()
def Erase(account,model,old_name,data):
    name=get_name(model)
    dic={"account":account}
    dic[name]=old_name
    obj=model.objects.get(**dic)
def CategoryUpdate(account,old_name,data):
    category=Category.objects.get(account=account,category_name=old_name)
    category.category_name=data['category_name']
    category.priority=data['priority']
    category.save()
def MenuUpdate(account,old_name,data):
    menu=Menu.objects.get(account=account,menu_name=old_name)
    menu.priority=data['priority']
    menu.menu_name=data['menu_name']
    menu.menu_image=data['menu_image']
    menu.price=data['price']
    menu.explain=data['explain']
    menu.is_forbidden=data['is_forbidden']
    menu.save()
def MenuSave(account,serializer):
    data=serializer.data
    try:
        menu=Menu(
            account=account,
            market_name=data['market_name'],
            priority=data['priority'],
            menu_name=data['menu_name'],
            menu_image=data['menu_image'],
            price=data['price'],
            explain=data['explain'],
        )
    except:
        menu=Menu(
            account=account,
            market_name=data['market_name'],
            priority=data['priority'],
            menu_name=data['menu_name'],
            price=data['price'],
            explain=data['explain'],
        )
    menu.save()
def get_order_num():
    try:order_num=Order.objects.filter(date__range=[date.today(),date.today()]).count()+1
    except:order_num=1
    tmpnum=str(randint(0,99))
    if len(tmpnum)==1: tmpnum='0'+tmpnum
    order_num=int(str(order_num)+tmpnum)
    return order_num
def Manage(model,account,upobj,obj_list):
    dic={"account":account}
    if model==Meca:
        name='menu'
        upname='category'
    elif model==Opme:
        name='option'
        upname='menu'
    dic[upname]=upobj
    model.objects.filter(**dic).delete()
    for obj in obj_list:
        dic[name]=obj
        model(**dic).save()
def MecaManage(account,category,menu_list):
    Meca.objects.filter(account=account,category=category).delete()
    for menu in menu_list:
        Meca(account=account,menu=menu,category=category).save()#없는데 있을시
def OpmeManage(account,menu,option_list):
    Opme.objects.filter(account=account,menu=menu).delete()
    for option in option_list:
        Opme(account=account,option=option,menu=menu).save()
def test(model,**vargs):
    try:return model(**vargs).save()
    except:return 0