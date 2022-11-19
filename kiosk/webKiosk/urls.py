from django.contrib import admin
from django.urls import path,include
from webKiosk.views import *

customer_patterns=[
    path('order/',OrderAPI.Create.as_view()),#손님 주문 넣는 곳
    path('category/',CategoryAPI.Read.as_view()),
    path('meca/',MecaAPI.Read.as_view()),
    path('opme/',OpmeAPI.Read.as_view()),
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
    path('meca/download/',MecaAPI.Download.as_view()),
    path('opme/management/',OpmeAPI.Management.as_view()),
    path('opme/read/',OpmeAPI.Read.as_view()),
    path('order/create/',OrderAPI.Create.as_view()),
    path('order/read/new/',OrderAPI.Read_new.as_view()),
    path('order/read/all/',OrderAPI.Read_all.as_view()),
    path('order/treat/',OrderAPI.Treat.as_view()),
    path('order/delete/',OrderAPI.Delete.as_view()),
    path('option/create/',OptionAPI.Create.as_view()),
    path('option/read/',OptionAPI.Read.as_view()),
    path('option/update/',OptionAPI.Update.as_view()),
    path('option/delete/',OptionAPI.Delete.as_view()),
]
account_patterns=[
    path('login/',AccountAPI.Login.as_view()),
    path('signup/',AccountAPI.MakeAccount.as_view()),    
]

urlpatterns=[
    path('test/',TestAPI.as_view()),
    path('admin/meet/', admin.site.urls),
    path('',include(customer_patterns)),
    path('client/',include(client_patterns)),
    path('account/',include(account_patterns)),
    path('session/',AccountAPI.CheckSession.as_view()),
]
