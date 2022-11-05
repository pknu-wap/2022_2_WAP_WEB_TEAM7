from django.contrib import admin
from django.urls import path,include
from webKiosk.views import *

customer_patterns=[
    path('order/',OrderAPI.Create.as_view()),#손님 주문 넣는 곳
    path('category/',CategoryAPI.Read.as_view()),
    path('meca/',MecaAPI.Read.as_view()),
    path('option/',OptionLoadAPI.as_view()),
]
client_patterns=[
    path('category/read/',CategoryAPI.Read.as_view()),
    path('category/create/',CategoryAPI.Create.as_view()),
    path('menu/read/',MenuAPI.Read.as_view()),
    path('menu/create/',MenuAPI.Create.as_view()),
    path('meca/management/',MecaAPI.Management.as_view()),
    path('meca/read/',MecaAPI.Read.as_view()),
    path('order/new/read/',NewOrderLoadAPI.as_view()),
    path('order/all/read/',AllOrderLoadAPI.as_view()),
    path('order/delete/',DeleteOrderAPI.as_view()),
    path('option/create/',OptionSaveAPI.as_view()),
    path('option/read/',OptionLoadAPI.as_view()),
]

urlpatterns=[
    path('admin/meet/', admin.site.urls),
    path('',include(customer_patterns)),
    path('client/',include(client_patterns)),
    path('main/',index),
    path('',MakeAcount.as_view()),
    
    #path('media/kiosk/',MenuImageListAPI.as_view())
]