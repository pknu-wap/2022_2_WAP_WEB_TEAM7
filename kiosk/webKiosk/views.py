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
                if model==Menu:
                    data=serializer.data
                    try:
                        menu_image=request.FILES["menu_image"]
                    except:check=False
                    else:check=True
                    dic=Dictionary(**serializer.data)
                    if check:
                        serializer=ImageSerializer(data=request.FILES)
                        if not serializer.is_valid(): 
                            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                        dic["menu_image"]=serializer.data["menu_image"]
                    if IsSameName(account,model,**dic)==False:
                        Save(model,account,**dic)
                        return Response(dic)
                    return HttpResponse("이미 동일한 이름이 존재합니다")    
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
            for i in serializer.data:
                print(i)
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
    def Download(self,request,is_customer):
        serializer=MarketSerializer(data=request.data)
        if serializer.is_valid():
            account=get_account_object(serializer)
            if account==None:return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            category_set=Category.objects.filter(account=account)
            dic={}
            i=0
            for category in category_set:
                dic[i]={}
                if is_customer:menu_set=category.menu_set.filter(is_forbidden=False)
                else:menu_set=category.menu_set.all()
                dic[i]['category_name']=category.category_name
                dic[i]['menu_set']=MenuSerializer(menu_set,many=True).data
                i+=1
            return Response(dic)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class TestAPI(APIView):
    def post(self,request,format=None):
        serializer=MarketSerializer(data=request.data)
        if serializer.is_valid():
            account=get_account_object(serializer)
            category_set=Category.objects.filter(account=account)
            dic={}
            i=0
            for category in category_set:
                dic[i]={}
                menu_set=category.menu_set.all()
                dic[i]['category_name']=category.category_name
                dic[i]['menu_set']=MenuSerializer(menu_set,many=True).data
                i+=1
            return Response(dic)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class CustomerAPI:
    class Category(APIView):
        def post(self,request,format=None):
            return CRUD.Read(self,request,Category)
    class Order(APIView):
        def post(self,request,format=None):
            return CRUD.Create(self,request,Order)
    class Download(APIView):
        def post(self,request,format=None):
            return CRUD.Download(self,request,True)
    class Meca(APIView):
        def post(self,request,format=None):

            return CRUD.MeOpRead(self,request,Meca)
    class Opme(APIView):
        def post(self,request,format=None):
            return CRUD.MeOpRead(self,request,Opme)
class AccountAPI:
    class Login(APIView):
        def post(self,request,format=None):
            serializer=LoginSerializer(data=request.data)
            if serializer.is_valid():
                account=get_obj(Account,**serializer.data)
                if account==None:
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                if account.is_approved==False:
                    return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
                request.session['market_name']=account.market_name
                session_id=request.session.session_key
                request.session.modified=True
                dic={
                    "session_id":session_id
                }
                return Response(dic)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class MakeAccount(APIView):
        def post(self,request,format=None):
            serializer=AccountSerializer(data=request.data)
            if serializer.is_valid():
                if serializer.data["is_approved"]==True:
                    return Response(serializer.errors,status=status.HTTP_403_FORBIDDEN)
                checkID=check_userid(serializer)
                if checkID!=False:
                    return HttpResponse(checkID)
                checkP=check_password_safe(serializer)
                if checkP!=False:
                    return HttpResponse(checkP)
                data=serializer.data
                password=Hash(serializer)
                dic={
                    "userid":data["userid"],
                    "market_name":data["market_name"],
                    "password":password,
                }
                Account(**dic).save()
                dic={
                    "userid":serializer.data["userid"],
                    "market_name":serializer.data["market_name"]
                }
                return Response(dic)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class CheckSession(APIView):
        def post(self,request,format=None):
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():
                if request.session['market_name']!=serializer.data['market_name']:
                    return Response(serializer.errors,status=status.HTTP_403_FORBIDDEN)
                session_id = request.session.session_key
                dic={
                    "session_id":session_id
                }
                return Response(dic)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


