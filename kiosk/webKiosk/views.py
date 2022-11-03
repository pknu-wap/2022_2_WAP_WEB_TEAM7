from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from django.http.response import HttpResponse
import json
#from rest_framework.renderers import JSONRenderer
#from django.http import HttpRequest

# Create your views here.
class CategoryLoadAPI(APIView):#카테고리 전달(사장,손님)
    def post(self,request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
class CategorySaveAPI(APIView):#카테고리 받기(사장)
    def post(self,request,format=None):
        serializer = CategorySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
class OrderSaveAPI(APIView):#주문 받기(손님)->{"menu_list":'{"menu1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
    def post(self,request,format=None):
        serializer = OrderSerializer(data = request.data)
        if serializer.is_valid():
            #수정필요
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class MenuLoadAPI(APIView):#메뉴전달(사장)
    def get(self,request):#임시
        queryset = Menu.objects.all()
        serializer = MenuSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self,request):
        queryset = Menu.objects.all()
        serializer = MenuSerializer(queryset, many=True)
        return Response(serializer.data)
class MenuSaveAPI(APIView):#메뉴 받기(사장)
    def post(self,request,format=None):
        serializer = MenuSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
class MenuCategoryConnectAPI(APIView):#카테고리,메뉴받고 연결(사장)->{"jsondata":["메뉴명",~]}
    def post(self,request,format=None):
        serializer=GetDataSerializer(data=request.data)
        if serializer.is_valid():
            dictionary=json_to_dict(serializer)
            try: ConnectCategorytoMenu(dictionary)
            except: return HttpResponse("sad")
            return HttpResponse("hello")
        return HttpResponse("bad")
class MenuCategoryLoadAPI(APIView):#카테고리 받고 메뉴 보냄(손님+사장일부)->{"category_name":"카테고리명"}
    def post(self,request,format=None):
        serializer=CategorySerializer(data=request.data)#카테고리 json으로 데이터를 받는다.
        if serializer.is_valid():
            try:
                queryset=GetMenuFromCategory(serializer)
                serializer=MenuSerializer(queryset,many=True)
            except:return HttpResponse("error")
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return HttpResponse(":P")
class NewOrderLoadAPI(APIView):#신규 주문 목록 전달(사장)
    def post(self,request):
        queryset=Order.objects.filter(is_new=True)
        serializer=OrderSerializer(queryset,many=True)
        return Response(serializer.data)
class AllOrderLoadAPI(APIView):#모든 주문 목록 전달
    pass
class DeleteOrderAPI(APIView):#전달받은 주문 삭제
    pass
class OptionSaveAPI(APIView):#옵션 받아서 생성/연결->{"menu_name":"연결메뉴명","option_list":'{"옵션셋명":["옵션1",~]}'}
    pass
class OptionLoadAPI(APIView):#메뉴 받고 옵션 전달
    pass
class Login(APIView):
    pass
class MakeAcount(APIView):
    pass
def index(request):
    anydata=Account.objects.all()
    context={'anydata':anydata}
    return render(request,'webKiosk/hello.html',context)
def json_to_dict(serializer):
    dictionary=serializer.data["jsondata"]
    dictionary=json.loads(dictionary)
    return dictionary
def ConnectCategorytoMenu(dictionary):
    for Cname in dictionary:
        MenuList=dictionary[Cname]
        object_C=Category.objects.get(category_name=Cname)
        ExistingDataQuery=Bridge.objects.filter(category=object_C)
        ExistingData=ExistingDataQuery.values()
        if len(ExistingData)==0:
            MakeConnectionMeCa(MenuList,object_C)
            continue
        else:
            existing_list=[]
            new_list=[]
            tmplist=[]
            for ed in ExistingData:
                existing_list.append(ed['menu_id'])
            for Mname in MenuList:
                object_M=Menu.objects.get(menu_name=Mname)
                menu_id=object_M.id
                new_list.append(menu_id)
            if sorted(new_list)==sorted(existing_list):
                continue
            for e in existing_list:
                if e in new_list:
                    tmplist.append(e)
                    continue
                object_M=Menu.objects.get(id=e)
                object_B=Bridge.objects.get(menu=object_M,category=object_C)
                object_B.delete()
            for tmp in tmplist:
                new_list.remove(tmp)
            if len(new_list)!=0: MakeConnectionMeCa(new_list,object_C)
def MakeConnectionMeCa(parameterList,object_C):
    if str(type(parameterList[0]))=="<class 'str'>":#name
        for Mname in parameterList:
            object_M=Menu.objects.get(menu_name=Mname)
            object_B=Bridge(menu=object_M,category=object_C)
            object_B.save()     
    elif str(type(parameterList[0]))=="<class 'int'>":#id
        for Mid in parameterList:
            object_M=Menu.objects.get(id=Mid)
            object_B=Bridge(menu=object_M,category=object_C)
            object_B.save()  
def GetMenuFromCategory(serializer):
    catename=serializer.data['category_name']
    object_C=Category.objects.get(category_name=catename)
    return object_C.menu_set.all()

            
        