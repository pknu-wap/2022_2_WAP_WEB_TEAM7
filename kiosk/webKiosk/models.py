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
    class Meta:
        ordering = ["priority","id"]
        db_table='menu'
    def __str__(self):
        return self.menu_name
class Category(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    menu_set=models.ManyToManyField("Menu",through="Bridge")
    category_name=models.CharField(max_length=200,unique=True)
    priority=models.IntegerField(default=100)
    class Meta:
        ordering = ["priority","id"]
        db_table='category'
    def __str__(self):
        return self.category_name
class Bridge(models.Model):
    menu=models.ForeignKey("Menu",on_delete=models.CASCADE)
    category=models.ForeignKey("Category",on_delete=models.CASCADE)
    class Meta:
        db_table="bridge"

class Option(models.Model):#{"option_list":'{"옵션셋명":["옵션1",~]}'}
    option_list=models.CharField(max_length=500)
    priority=models.IntegerField(default=100)
    menu=models.ForeignKey("Menu",on_delete=models.CASCADE)
    class Meta:
        ordering = ["priority","id"]
        db_table='option'
    def __str__(self):
        return self.option_list

class Order(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
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
    class Meta:
        db_table='account'
    def __str__(self):
        return self.market_name
