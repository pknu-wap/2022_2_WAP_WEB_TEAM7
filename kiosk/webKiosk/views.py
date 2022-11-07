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
    class Update(APIView):#test
        def post(self,request,format=None):
            serializer=UpdateSerializer(request.data)
            if serializer.is_valid():
                try:
                    old_name,new_data=get_old_new_data(serializer)
                    account=get_account_object(serializer)
                    data=json.loads(new_data)
                    CategoryUpdate(account,old_name,data)
                except:return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    class Delete(APIView):#GetDataSerializer
        pass

    
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
    class Read_all(APIView):#모든 주문 목록 전달,test
        def post(self,request,format=None):
            serializer=MarketSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                queryset=Order.objects.filter(account=account)
                serializer=OrderSerializer(queryset,many=True)
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class Delete(APIView):#전달받은 주문 삭제,test
        def post(self,request,format=None):
            serializer=OrderSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                order=get_perfect_order_object(account,serializer)
                if account==None or order==None: 
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                order.delete()
                queryset=Order.objects.filter(account=account)
                serializer=OrderSerializer(queryset,many=True)
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    class Accept(APIView):
        pass
class MenuAPI:
    class Create(APIView):#메뉴 받기(사장),완성
        def post(self,request,format=None):
            serializer = MenuSerializer(data=request.data)
            if serializer.is_valid():
                account=get_account_object(serializer)
                if account==None: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                MenuSave(account,serializer)
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
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
    class Update(APIView):
        pass
    class Delete(APIView):
        pass    
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
class OpmeAPI:
    class Management(APIView):
        pass
    class Read(APIView):
        pass
class OptionAPI:#같은 가게에서 이름 안 겹치게 만들어야함
    class Create(APIView):#{"option_name":"이름","option_list":'["옵션1",~]',"priority":""}
        def post(self,request,format=None):
            pass
    class Read(APIView):#메뉴 받고 옵션 전달
        pass
    class Update(APIView):
        pass
    class Delete(APIView):
        pass
class AccountAPI:
    class Login(APIView):
        pass
    class MakeAccount(APIView):
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


