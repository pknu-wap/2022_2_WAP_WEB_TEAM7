#product/serializers.py
from dataclasses import field
from rest_framework import serializers
from .models import *

class MenuSerializer(serializers.ModelSerializer):
    priority=serializers.IntegerField(default=1000)
    explain=serializers.CharField(default="None")
    class Meta:
        model=Menu
        fields=('market_name','priority','menu_name','menu_image','price','explain')
class CategorySerializer(serializers.ModelSerializer):
    priority=serializers.IntegerField(default=100)
    class Meta:
        model=Category
        fields=('market_name','category_name','priority')
class OptionSerializer(serializers.ModelSerializer):
    priority=serializers.IntegerField(default=100)
    class Meta:
        model=Option
        fields=('option_list','menu_name','priority')
class OrderSerializer(serializers.ModelSerializer):
    is_new=serializers.BooleanField(default=True)
    class Meta:
        model=Order
        fields=('market_name','menu_list','all_price','create_date','is_new','take_out')
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=('userid','password','market_name')

class MecaSerializer(serializers.Serializer):
    market_name=serializers.CharField()
    category_name=serializers.CharField()
    menu_set=serializers.CharField(default="None")#문자열
class MarketSerializer(serializers.Serializer):
    market_name=serializers.CharField()
class GetDataSerializer(serializers.Serializer):
    data=serializers.CharField()
class UpdateSerializer(serializers.Serializer):#메뉴,카데고리,옵션
    old=serializers.CharField()
    market_name=serializers.CharField()
    new=serializers.CharField()

