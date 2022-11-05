from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from django.http.response import HttpResponse
import json
import bcrypt

#from rest_framework.renderers import JSONRenderer
#from django.http import HttpRequest

# Create your views here.
class CategoryAPI:
    class Create(APIView):#카테고리 받기(사장),완성
        def post(self,request,format=None):
            serializer=CategorySerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                CategorySave(account,serializer.data)
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    class Read(APIView):#카테고리 전달(사장,손님),완성
        def post(self,request,format=None):#{"market_name":"",~}
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                queryset = Category.objects.filter(account=account)
                serializer = CategorySerializer(queryset, many=True)
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    class Update(APIView):#테스트 필요
        def post(self,request,format=None):
            serializer=UpdateSerializer(request.data)
            if serializer.is_valid():
                try:
                    old_name,new_data=get_old_new_data(serializer)
                    account=get_account_object(serializer)
                    data=json.loads(new_data)
                    CategorySave(account,data)
                    Category.objects.get(category_name=old_name).delete()
                except:return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    
class OrderAPI:
    class Create(APIView):#주문 받기,완성?(손님)->{"market_name"="","menu_list":'{"menu1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
        def post(self,request,format=None):#테스트 필요(문자열화된 json안에 json)
            serializer = OrderSerializer(data = request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                OrderSave(account,serializer)
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class MenuAPI:
    class Read(APIView):#메뉴전달(사장),완성
        def post(self,request,format=None):#메뉴전체
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                queryset = Menu.objects.filter(account=account)
                serializer = MenuSerializer(queryset, many=True)
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    class Create(APIView):#메뉴 받기(사장),완성
        def post(self,request,format=None):
            serializer = MenuSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                MenuSave(account,serializer)
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
class MecaAPI:
    class Management(APIView):#메카연결(사장),완성->#{"market_name":"S","category_name":"","menu_set":'["메뉴1",~]'}
        def post(self,request,format=None):
            serializer=MecaSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                category=get_category_object(account,serializer)
                menu_list=get_menu_list(account,serializer)
                if account==None or category==None or menu_list==None: 
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                MecaManage(category,menu_list)
                query_set=category.menu_set.all()
                serializer=MenuSerializer(query_set,many=True)
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class Read(APIView):#카테고리로 메뉴 보냄(손님+사장일부),완성->{"market_name":"","category_name":"카테고리명"}
        def post(self,request,format=None):
            serializer=MecaSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                category=get_category_object(account,serializer)
                if account==None or category==None: 
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                query_set=category.menu_set.all()
                serializer=MenuSerializer(query_set,many=True)
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class NewOrderLoadAPI(APIView):#신규 주문 목록 전달(사장)
    def post(self,request,format=None):
        queryset=Order.objects.filter(is_new=True)
        serializer=OrderSerializer(queryset,many=True)
        return Response(serializer.data)
class AllOrderLoadAPI(APIView):#모든 주문 목록 전달
    pass
class DeleteOrderAPI(APIView):#전달받은 주문 삭제
    pass
class OptionSaveAPI(APIView):#옵션 받아서 생성/연결->{"market_name":"","menu_name":"연결메뉴명","option_list":'{"옵션셋명":["옵션1",~]}'}
    def post(self,request,format=None):
        pass
class OptionLoadAPI(APIView):#메뉴 받고 옵션 전달
    pass
class Login(APIView):
    pass
class MakeAcount(APIView):
    def get(self,request,format=None):#get일시 id존재여부 확인
        serializer=GetDataSerializer(data=request.data)
        if serializer.is_valid():
            if is_id_exist(serializer):
                HttpResponse("id is already exist")
            HttpResponse("available id")
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 
    def post(self,request,format=None):
        serializer=AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()#테스트용
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
def index(request):
    anydata=Account.objects.all()
    context={'anydata':anydata}
    return render(request,'webKiosk/hello.html',context)
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
def get_old_new_data(serializer):
    data=serializer.data
    old_data=data['old']
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
    Bridge.objects.filter(category=category).delete()
    for menu in menu_list:
        Bridge(menu=menu,category=category).save()#없는데 있을시

