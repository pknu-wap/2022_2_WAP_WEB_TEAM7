# Generated by Django 4.1 on 2022-11-29 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webKiosk", "0008_alter_menu_menu_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="is_accepted",
            field=models.BooleanField(default=False),
        ),
    ]
