from django.shortcuts import render
from .models import *
from .serializers import *
import json
import bcrypt
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

def CategorySave(account,data):
    category=Category(
        account=account,
        market_name=data['market_name'],
        category_name=data['category_name'],
        priority=data['priority'],
    )
    category.save()
def CategoryUpdate(account,old_name,data):
    category=Category.objects.get(account=account,category_name=old_name)
    category.category_name=data['category_name']
    category.priority=data['priority']

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
def OrderSave(account,serializer):
    data=serializer.data
    order=Order(
        account=account,
        menu_list=data['menu_list'],
        all_price=data['all_price'],
        create_date=data['create_date'],
        is_new=data['is_new'],
        take_out=data['take_out']
    )
    order.save()
def MecaManage(category,menu_list):
    Meca.objects.filter(category=category).delete()
    for menu in menu_list:
        Meca(menu=menu,category=category).save()#없는데 있을시