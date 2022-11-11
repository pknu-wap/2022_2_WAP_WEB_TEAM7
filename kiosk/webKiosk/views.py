from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from .views_function import *
from rest_framework import status
from django.http.response import HttpResponse
import json
import bcrypt

#from rest_framework.renderers import JSONRenderer
#from django.http import HttpRequest

# Create your views here.

def get_Serializer(model):
    if model==Category:
        Serializer=CategorySerializer
    if model==Order:
        Serializer=OrderSerializer
    if model==Menu:
        Serializer=MenuSerializer
    if model==Meca:
        Serializer=MecaSerializer
    if model==Opme:
        Serializer=OpmeSerializer
    if model==Option:
        Serializer=OptionSerializer
    return Serializer

def IsSameName(account,model,**vargs):
    dic=get_dic(account,model,**vargs)
    try: model.objects.get(**dic)
    except: return False
    return True
class CRUD:
    def Create(self,request,model):
            Serializer=get_Serializer(model)
            serializer=Serializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                if model==Order: 
                    order_num=get_order_num()
                    Save(model,account,**serializer.data,order_num=order_num)
                    serializer=Serializer(get_obj(model,account=account,order_num=order_num,**serializer.data))
                else: 
                    if IsSameName(account,model,**serializer.data)==False:
                        Save(model,account,**serializer.data)
                        serializer=Serializer(get_obj(model,account=account,**serializer.data))
                    else: return HttpResponse("이미 동일한 이름이 존재합니다.")
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def Management(self,request,model):#Opme 검사 필요
        Serializer=get_Serializer(model)
        serializer=Serializer(data=request.data)
        if serializer.is_valid():
            account=get_account_object(serializer)
            if model==Meca:
                upobj=get_category_object(account,serializer)
                obj_list=get_obj_list(account,Menu,serializer)
            elif model==Opme:
                upobj=get_menu_object(account,serializer)
                obj_list=get_obj_list(account,Option,serializer)
            if account==None or upobj==None or obj_list==None: 
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            Manage(model,account,upobj,obj_list)
            if model==Meca:
                query_set=upobj.menu_set.all()
                serializer=MenuSerializer(query_set,many=True)
            elif model==Opme:
                query_set=upobj.option_set.all()
                serializer=OptionSerializer(query_set,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def Read(self,request,model):
        serializer=MarketSerializer(data=request.data)
        if serializer.is_valid():
            account=get_account_object(serializer)
            if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            queryset = model.objects.filter(account=account)
            Serializer=get_Serializer(model)
            serializer = Serializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def Update(self,request,model):#menu,category,option
        serializer=UpdateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                old_name,new_data=get_old_new_data(serializer)
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                data=json.loads(new_data)
                name=get_name(model)
                if IsSameName(account,model,**data)==False:
                    dic={'account':account,name:old_name}
                    obj=get_obj(model,**dic)
                    if obj==None:return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                    model.update(obj,**data)
                else: return HttpResponse("이미 동일한 이름이 존재합니다.")
            except:return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def Delete(self,request,model):#모든 데이터
        Serializer=get_Serializer(model)
        serializer=Serializer(data=request.data)
        if serializer.is_valid():
            obj=get_obj(model,**serializer.data)
            if obj==None:return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            obj.delete()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def MeOpRead(self,request,model):
        Serializer=get_Serializer(model)
        serializer=Serializer(data=request.data)
        if serializer.is_valid():
            account=get_account_object(serializer)
            if model==Meca:upobj=get_category_object(account,serializer)
            if model==Opme:upobj=get_menu_object(account,serializer)
            if account==None or upobj==None:return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            if model==Meca:
                query_set=upobj.menu_set.all()
                serializer=MenuSerializer(query_set,many=True)
            if model==Opme:
                query_set=upobj.option_set.all()
                serializer=OptionSerializer(query_set,many=True)
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class TestAPI(APIView):
    def post(self,request,format=None):
        return CRUD.Management(self,request,Opme)
class CategoryAPI:
    class Create(APIView):#카테고리 받기(사장),완성
        def post(self,request,format=None):
            return CRUD.Create(self,request,Category)
    class Read(APIView):#카테고리 전달(사장,손님),완성
        def post(self,request,format=None):#{"market_name":"",~}
            return CRUD.Read(self,request,Category)
    class Update(APIView):
        def post(self,request,format=None):
            return CRUD.Update(self,request,Category)
    class Delete(APIView):#완성
        def post(self,request,format=None):
            return CRUD.Delete(self,request,Category)
class OrderAPI:
    class Create(APIView):#주문 받기,완성?(손님)->{"market_name"="","menu_list":'{"menu1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
        def post(self,request,format=None):#테스트 필요(문자열화된 json안에 json)
            return CRUD.Create(self,request,Order)
    class Read_new(APIView):#신규 주문 목록 전달(사장),test
        def post(self,request,format=None):
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                queryset=Order.objects.filter(account=account,is_new=True)
                serializer=OrderSerializer(queryset,many=True)
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class Read_all(APIView):#수정필요할지도?
        def post(self,request,format=None):
            return CRUD.Read(self,request,Order)
    class Delete(APIView):
        def post(self,request,format=None):
            return CRUD.Delete(self,request,Order)
    class Treat(APIView):#진 테스트 필요
        def post(self,request,format=None):
            serializer=OrderUpdateSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                old_order=json.loads(serializer.data['old_order'])
                new=json.loads(serializer.data['new'])
                order=get_obj(Order,**old_order)
                if account==None or order==None: 
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                Order.update(order,**new)
                queryset=Order.objects.filter(account=account,is_new=True)
                serializer=OrderSerializer(queryset,many=True)
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class MenuAPI:
    class Create(APIView):#메뉴 받기(사장),완성
        def post(self,request,format=None):
            return CRUD.Create(self,request,Menu)
    class Read(APIView):#메뉴전달(사장),완성
        def post(self,request,format=None):#메뉴전체#post로
            return CRUD.Read(self,request,Menu)
    class Update(APIView):#test
        def post(self,request,format=None):
            return CRUD.Update(self,request,Menu)
    class Delete(APIView):#test
        def post(self,request,format=None):
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():   
                account=get_account_object(serializer)
                menu=get_menu_object(account,serializer)
                if account==None or menu==None: 
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                menu.delete()
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 
class MecaAPI:
    class Management(APIView):#메카연결(사장),완성->#{"market_name":"S","category_name":"","menu_set":'["메뉴1",~]'}
        def post(self,request,format=None):
            return CRUD.Management(self,request,Meca)
    class Read(APIView):#카테고리로 메뉴 보냄(손님+사장일부),완성->{"market_name":"","category_name":"카테고리명"}
        def post(self,request,format=None):
            return CRUD.MeOpRead(self,request,Meca)
class OpmeAPI:
    class Management(APIView):
        def post(self,request,format=None):
            return CRUD.Management(self,request,Opme)
    class Read(APIView):
        def post(self,request,format=None):
            return CRUD.MeOpRead(self,request,Opme)
class OptionAPI:#같은 가게에서 이름 안 겹치게 만들어야함
    class Create(APIView):#{"option_name":"이름","option_list":'["옵션1",~]',"priority":""}
        def post(self,request,format=None):
            return CRUD.Create(self,request,Option)
    class Read(APIView):#메뉴 받고 옵션 전달
        def post(self,request,format=None):
            return CRUD.Read(self,request,Option)
    class Update(APIView):
        def post(self,request,format=None):
            return CRUD.Update(self,request,Option)
    class Delete(APIView):
        def post(self,request,format=None):
            return CRUD.Delete(self,request,Option)
class AccountAPI:
    class Login(APIView):
        pass
    class MakeAccount(APIView):
        def get(self,request,format=None):#get일시 id존재여부 확인
            serializer=GetDataSerializer(data=request.data)
            if serializer.is_valid():
                if is_id_exist(serializer):
                    return HttpResponse("id is already exist")
                return HttpResponse("available id")
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 
        def post(self,request,format=None):
            serializer=AccountSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()#테스트용
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


