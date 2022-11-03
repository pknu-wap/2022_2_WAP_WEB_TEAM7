from django.contrib import admin
from django.urls import path,include
from webKiosk.views import *

customer_patterns=[
    path('order/',OrderSaveAPI.as_view()),#손님 주문 넣는 곳
    path('category/',CategoryLoadAPI.as_view()),
    path('meca/',MenuCategoryLoadAPI.as_view()),
    path('option/',OptionLoadAPI.as_view()),
]
client_patterns=[
    path('category/load/',CategoryLoadAPI.as_view()),
    path('category/save/',CategorySaveAPI.as_view()),
    path('menu/load/',MenuLoadAPI.as_view()),
    path('menu/save/',MenuSaveAPI.as_view()),
    path('conect/meca/',MenuCategoryConnectAPI.as_view()),
    path('meca/load/',MenuCategoryLoadAPI.as_view()),
    path('order/new/load/',NewOrderLoadAPI.as_view()),
    path('order/all/load/',AllOrderLoadAPI.as_view()),
    path('order/delete/',DeleteOrderAPI.as_view()),
    path('option/save/',OptionSaveAPI.as_view()),
    path('option/load/',OptionLoadAPI.as_view()),
]

urlpatterns=[
    path('admin/meet/', admin.site.urls),
    path('',include(customer_patterns)),
    path('client/',include(client_patterns)),
    path('main/',index),
  
    #path('media/kiosk/',MenuImageListAPI.as_view())
]