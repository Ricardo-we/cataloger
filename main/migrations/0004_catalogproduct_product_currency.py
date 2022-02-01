# Generated by Django 4.0 on 2022-01-30 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_catalog_options_alter_catalogproduct_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalogproduct',
            name='product_currency',
            field=models.CharField(blank=True, choices=[('Q', 'Q'), ('USD', '$'), ('EUR', '€'), ('JPY', '¥'), ('GBP', '£')], default='Q', max_length=100, null=True),
        ),
    ]
