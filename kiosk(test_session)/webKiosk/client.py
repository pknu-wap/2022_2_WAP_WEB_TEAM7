from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from .views_function import *
from rest_framework import status
from django.http.response import HttpResponse
import json
import bcrypt
from .views import *

'''
response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
'''
class CategoryAPI:
    class Create(APIView):#카테고리 받기(사장),완성
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Create(self,request,Category)
    class Read(APIView):#카테고리 전달(사장,손님),완성
        def post(self,request,format=None):#{"market_name":"",~}
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Read(self,request,Category)
    class Update(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Update(self,request,Category)
    class Delete(APIView):#완성
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Delete(self,request,Category)
class OrderAPI:
    class Create(APIView):#주문 받기,완성?(손님)->{"market_name"="","menu_list":'{"menu1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
        def post(self,request,format=None):#테스트 필요(문자열화된 json안에 json)
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Create(self,request,Order)
    class Read_new(APIView):#신규 주문 목록 전달(사장),test
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
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
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Read(self,request,Order)
    class Delete(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Delete(self,request,Order)
    class Treat(APIView):#진 테스트 필요
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
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
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Create(self,request,Menu)
    class Read(APIView):#메뉴전달(사장),완성
        def post(self,request,format=None):#메뉴전체#post로
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Read(self,request,Menu)
    class Update(APIView):#test
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Update(self,request,Menu)
    class Delete(APIView):#test
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
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
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Management(self,request,Meca)
    class Read(APIView):#카테고리로 메뉴 보냄(손님+사장일부),완성->{"market_name":"","category_name":"카테고리명"}
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.MeOpRead(self,request,Meca)
    class Download(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Download(self,request,False)
class OpmeAPI:
    class Management(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Management(self,request,Opme)
    class Read(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.MeOpRead(self,request,Opme)
class OptionAPI:#같은 가게에서 이름 안 겹치게 만들어야함
    class Create(APIView):#{"option_name":"이름","option_list":'["옵션1",~]',"priority":""}
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Create(self,request,Option)
    class Read(APIView):#메뉴 받고 옵션 전달
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Read(self,request,Option)
    class Update(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Update(self,request,Option)
    class Delete(APIView):
        def post(self,request,format=None):
            response=AccountAPI.CheckSession.post(self,request,format=None)
            if response.status_code not in [200,201,202]:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return CRUD.Delete(self,request,Option)