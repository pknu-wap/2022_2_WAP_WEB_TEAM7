#product/serializers.py
from dataclasses import field
from rest_framework import serializers
from .models import *

class MenuSerializer(serializers.ModelSerializer):#사진때매 어쩔수 없음
    priority=serializers.IntegerField(default=1000)
    explain=serializers.CharField(default="None")
    class Meta:
        model=Menu
        fields=('id','market_name','priority','menu_name','menu_image','price','explain','is_forbidden')
class CategorySerializer(serializers.ModelSerializer):
    priority=serializers.IntegerField(default=100)
    class Meta:
        model=Category
        fields=('id','market_name','category_name','priority')
class OptionSerializer(serializers.ModelSerializer):
    priority=serializers.IntegerField(default=100)
    class Meta:
        model=Option
        fields=('id','market_name','option_name','option_list','priority')
class OrderSerializer(serializers.ModelSerializer):
    is_new=serializers.BooleanField(default=True)
    class Meta:
        model=Order
        fields=('id','market_name','table_num','order_num','menu_list','all_price','create_date','is_new','take_out')
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=('id','userid','password','market_name','is_approved')
class LoginSerializer(serializers.Serializer):
    userid=serializers.CharField()
    password=serializers.CharField()
    market_name=serializers.CharField()
class MecaSerializer(serializers.Serializer):
    market_name=serializers.CharField()
    category_name=serializers.CharField()
    menu_set=serializers.CharField(default="None")#문자열
class OpmeSerializer(serializers.Serializer):
    market_name=serializers.CharField()
    menu_name=serializers.CharField()
    option_set=serializers.CharField(default='None')

class MarketSerializer(serializers.Serializer):
    market_name=serializers.CharField()
    menu_name=serializers.CharField(default='None')
    category_name=serializers.CharField(default='None')
    option_name=serializers.CharField(default='None')
class GetDataSerializer(serializers.Serializer):
    data=serializers.CharField()
class UpdateSerializer(serializers.Serializer):#메뉴,카데고리,옵션
    market_name=serializers.CharField()
    old_name=serializers.CharField()
    new=serializers.CharField()
class OrderUpdateSerializer(serializers.Serializer):
    old_order=serializers.CharField()
    new=serializers.CharField()
    market_name=serializers.CharField()

