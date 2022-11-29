from django.db import models

# Create your models here.

class Menu(models.Model):
    def nameFile(instance,filename):
        return '/'.join(['images',str(instance.market_name),filename])
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    priority=models.IntegerField(default=1000)
    menu_name=models.CharField(max_length=200)
    menu_image=models.ImageField(upload_to=nameFile,default="default.png")
    price=models.IntegerField()
    explain=models.CharField(max_length=400,default="None")
    is_forbidden=models.BooleanField(default=False)
    option_set=models.ManyToManyField("Option",through="Opme")
    class Meta:
        ordering = ["priority","id"]
        db_table='menu'
    def __str__(self):
        return self.menu_name
    def update(self,**vargs):
        if 'priority' in vargs:self.priority=vargs['priority']
        if 'menu_name' in vargs:self.menu_name=vargs['menu_name']
        if 'menu_image' in vargs:self.menu_image=vargs['menu_image']
        if 'price' in vargs:self.price=vargs['price']
        if 'explain' in vargs:self.explain=vargs['explain']
        if 'is_forbidden' in vargs:self.is_forbidden=vargs['is_forbidden']
        self.save()
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
    def update(self,**vargs):
        if 'category_name' in vargs:self.category_name=vargs['category_name']
        if 'priority' in vargs:self.priority=vargs['priority']
        self.save()
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
class Option(models.Model):#{"market_name":"","option_name":"","option_list":'["옵션1",~]',"priority":""},옵션 따로 저장할 것!
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    option_name=models.CharField(max_length=200)
    option_list=models.CharField(max_length=500)
    priority=models.IntegerField(default=100)
    class Meta:
        ordering = ["priority","id"]
        db_table='option'
    def __str__(self):
        return self.option_name
    def update(self,**vargs):
        if 'option_name' in vargs:self.option_name=vargs['option_name']
        if 'option_list' in vargs:self.option_list=vargs['option_list']
        if 'priority' in vargs:self.priority=vargs['priority']
        self.save()

class Order(models.Model):
    account=models.ForeignKey("Account",on_delete=models.CASCADE)
    market_name=models.CharField(max_length=200)
    table_num=models.IntegerField(default=0)#테이블번호,0일시 예외처리
    order_num=models.IntegerField(default=0)#주문번호
    menu_list=models.TextField()#{"menu_list":'{"메뉴명1":{"num":2,"option":{"맵기":"보통","양":"많이"},"demand":"내용"}}',~}
    all_price=models.IntegerField()
    create_date=models.DateTimeField()
    is_new=models.BooleanField(default=True)
    is_accepted=models.BooleanField(default=False)
    take_out=models.BooleanField()
    class Meta:
        ordering=["-create_date","id"]
        db_table='order'
    def __str__(self):
        return str(self.create_date)
    def update(self,**vargs):
        if 'table_num' in vargs: self.table_num=vargs['table_num']
        if 'menu_list' in vargs: self.menu_list=vargs['menu_list']
        if 'all_price' in vargs: self.all_price=vargs['all_price']
        if 'is_new' in vargs:self.is_new=vargs['is_new']
        if 'take_out' in vargs:self.take_out=vargs['take_out']
        if 'is_accepted' in vargs:self.is_accepted=vargs['is_accepted']
        self.save()
class Account(models.Model):
    userid=models.CharField(unique=True,max_length=100)
    password=models.CharField(max_length=100)
    market_name=models.CharField(unique=True,max_length=200)
    is_approved=models.BooleanField(default=False)
    max_table=models.IntegerField(default=0)
    class Meta:
        db_table='account'
    def __str__(self):
        return self.market_name
    def update(self,**vargs):
        if 'password' in vargs: self.password=vargs['password']
        if 'market_name' in vargs: self.market_name=vargs['market_name']
        if 'is_approved' in vargs: self.is_approved=vargs['is_approved']
        self.save()
