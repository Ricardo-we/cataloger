from django.contrib import admin
from .models import Catalog, CatalogProduct, Users
# Register your models here.
admin.site.register(Users)
admin.site.register(Catalog)
admin.site.register(CatalogProduct)