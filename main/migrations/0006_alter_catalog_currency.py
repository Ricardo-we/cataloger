# Generated by Django 4.0 on 2022-12-15 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_remove_catalogproduct_product_currency_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catalog',
            name='currency',
            field=models.CharField(blank=True, default='Q', max_length=100, null=True),
        ),
    ]
