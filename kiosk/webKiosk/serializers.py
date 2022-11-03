#product/serializers.py
from dataclasses import field
from rest_framework import serializers
from .models import *

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields=("priority","menu_name","menu_image","price","explain")
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category      
        fields = ('category_name','priority')  
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Option
        fields=('option_list','menu_name','priority')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=('menu_list','all_price','create_date','is_new','take_out')

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=('userid','password','market_name')

class GetDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=GetData
        fields=('jsondata',)
