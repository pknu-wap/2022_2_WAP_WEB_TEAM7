from django.db import models

# Create your models here.

class Menu(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    priority=models.IntegerField(default=1000)
    menu_name=models.CharField(max_length=200,unique=True)
    menu_image=models.ImageField(upload_to='kiosk',default="default.png")
    price=models.IntegerField()
    explain=models.CharField(max_length=400,default="None")
    is_forbidden=models.BooleanField(default=False)
    option_set=models.ManyToManyField("Option",through="Opme")
    class Meta:
        ordering = ["priority","id"]
        db_table='menu'
    def __str__(self):
        return self.menu_name
class Category(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    menu_set=models.ManyToManyField("Menu",through="Meca")
    category_name=models.CharField(max_length=200)
    priority=models.IntegerField(default=100)
    class Meta:
        ordering = ["priority","id"]
        db_table='category'
    def __str__(self):
        return self.category_name
class Meca(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    menu=models.ForeignKey("Menu",on_delete=models.CASCADE)
    category=models.ForeignKey("Category",on_delete=models.CASCADE)
    class Meta:
        db_table="meca"
class Opme(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    menu=models.ForeignKey("Menu",on_delete=models.CASCADE)
    option=models.ForeignKey("Option",on_delete=models.CASCADE)
    class Meta:
        db_table="opme"
class Option(models.Model):#{"option_name":"이름","option_list":'["옵션1",~]',"priority":""},옵션 따로 저장할 것!
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    option_name=models.CharField(max_length=200)
    option_list=models.CharField(max_length=500)
    priority=models.IntegerField(default=100)
    class Meta:
        ordering = ["priority","id"]
        db_table='option'
    def __str__(self):
        return self.option_list

class Order(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    table_num=models.IntegerField(default=0)#테이블번호,0일시 예외처리
    order_num=models.IntegerField(default=0)#주문번호
    menu_list=models.TextField()#{"menu_list":'{"메뉴명1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
    all_price=models.IntegerField()
    create_date=models.DateTimeField()
    is_new=models.BooleanField(default=True)
    take_out=models.BooleanField()
    class Meta:
        ordering=["-create_date","id"]
        db_table='order'
    def __str__(self):
        return str(self.create_date)
class Account(models.Model):
    userid=models.CharField(unique=True,max_length=100)
    password=models.CharField(max_length=100)
    market_name=models.CharField(unique=True,max_length=200)
    is_approved=models.BooleanField(default=False)
    class Meta:
        db_table='account'
    def __str__(self):
        return self.market_name
