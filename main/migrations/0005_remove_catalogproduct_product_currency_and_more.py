# Generated by Django 4.0 on 2022-01-30 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_catalogproduct_product_currency'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='catalogproduct',
            name='product_currency',
        ),
        migrations.AddField(
            model_name='catalog',
            name='currency',
            field=models.CharField(blank=True, choices=[('Q', 'Q'), ('USD', '$'), ('EUR', '€'), ('JPY', '¥'), ('GBP', '£')], default='Q', max_length=100, null=True),
        ),
    ]
