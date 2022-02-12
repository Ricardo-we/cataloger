from django.urls import path
from . import views
from main.api import Catalogs , CatalogProducts

urlpatterns = [ 
    path('login/', views.login, name="Login"),
    path('fk-login/', views.get_ip_send_mail, name="ClientIp"),
    path('check-user/', views.check_user, name="CheckUser"),
    path('create-user/', views.create_user, name="CreateUser"),
    path('manage-catalogs/', views.home, name="CreateCatalog"),
    path('manage-catalogs/<int:id>', Catalogs.Catalogs.as_view(), name="ManageCatalogs"),
    path('<str:catalog_id>/product-view-management/<int:product_id>', views.product_detail_management),
    path('manage-catalogs/products/<int:catalogid>', views.manage_catalog_products, name="CatalogProductManagement"),
    path('manage-products/<int:catalogid>', views.manage_products_view, name="ManageProducts"),
    path('home/', views.home, name="Home"),
    path('view-catalog/<int:catalog_id>/', views.catalog_view, name="CatalogView"),
    path('<str:catalog_id>/product-view/<int:product_id>', views.product_detail_view, name="ProductDetails")
]