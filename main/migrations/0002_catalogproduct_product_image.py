# Generated by Django 4.0 on 2022-01-20 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalogproduct',
            name='product_image',
            field=models.ImageField(null=True, upload_to='', verbose_name='Product image'),
        ),
    ]
