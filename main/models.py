from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    email = models.CharField(max_length=400, default="example@gmail.com", null=False)
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Catalog(models.Model):
    username = models.ForeignKey(Users, null=True, on_delete=models.CASCADE)
    catalog_name = models.CharField(max_length=250, verbose_name="Catalog name")
    currency = models.CharField(max_length=100, blank=True, null=True, default="Q")
    class Meta:
        verbose_name = 'Catalog'
        verbose_name_plural = 'Catalogs'

class CatalogProduct(models.Model):
    catalog_name = models.ForeignKey(Catalog, null=True, on_delete=models.CASCADE, verbose_name="Catalog name")
    product_name = models.CharField(max_length=400, verbose_name="Product name")
    product_price = models.FloatField(verbose_name="Product price")
    product_image = models.ImageField(verbose_name="Product image", null=True, upload_to="product-images")
    product_description = models.TextField(null=True)
    class Meta:
        verbose_name = 'Catalog product'
        verbose_name_plural = 'Catalog products'

