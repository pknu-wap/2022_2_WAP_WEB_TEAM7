from django.contrib import admin
from django.urls import path,include
from webKiosk.views import *

customer_patterns=[
    path('order/',OrderAPI.Create.as_view()),#손님 주문 넣는 곳
    path('category/',CategoryAPI.Read.as_view()),
    path('meca/',MecaAPI.Read.as_view()),
    path('option/',OptionAPI.Read.as_view()),
]
client_patterns=[
    path('category/create/',CategoryAPI.Create.as_view()),
    path('category/read/',CategoryAPI.Read.as_view()),
    path('category/update/',CategoryAPI.Update.as_view()),
    path('category/delete/',CategoryAPI.Delete.as_view()),  
    path('menu/create/',MenuAPI.Create.as_view()),
    path('menu/read/',MenuAPI.Read.as_view()),
    path('menu/update/',MenuAPI.Update.as_view()),
    path('menu/delete/',MenuAPI.Delete.as_view()),
    path('meca/management/',MecaAPI.Management.as_view()),
    path('meca/read/',MecaAPI.Read.as_view()),
    path('order/new/read/',OrderAPI.Read_new.as_view()),
    path('order/all/read/',OrderAPI.Read_all.as_view()),
    path('order/delete/',OrderAPI.Delete.as_view()),
    path('option/create/',OptionAPI.Create.as_view()),
    path('option/read/',OptionAPI.Read.as_view()),
]

urlpatterns=[
    path('admin/meet/', admin.site.urls),
    path('',include(customer_patterns)),
    path('client/',include(client_patterns)),
    path('',AccountAPI.MakeAccount.as_view()),
    
    #path('media/kiosk/',MenuImageListAPI.as_view())
]