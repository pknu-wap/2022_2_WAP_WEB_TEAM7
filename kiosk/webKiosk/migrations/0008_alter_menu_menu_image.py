# Generated by Django 4.1 on 2022-11-27 16:54

from django.db import migrations, models
import webKiosk.models


class Migration(migrations.Migration):

    dependencies = [
        ("webKiosk", "0007_account_max_table"),
    ]

    operations = [
        migrations.AlterField(
            model_name="menu",
            name="menu_image",
            field=models.ImageField(
                default="default.png", upload_to=webKiosk.models.Menu.nameFile
            ),
        ),
    ]
