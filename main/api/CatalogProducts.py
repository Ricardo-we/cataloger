from django.views import View
from main.models import Catalog, CatalogProduct, Users
from django.http import JsonResponse, QueryDict
from django.http.multipartparser import MultiPartParser

class CatalogProducts(View):
    def get(self, request, catalogid):
        requested_catalog = Catalog.objects.filter(id=catalogid)[0]
        catalog_products = CatalogProduct.objects.filter(catalog_name=requested_catalog)
        final_response = []

        for product in catalog_products:
            product_data = {
                'id': product.id,
                'name': product.product_name,
                'price': product.product_price,
                'description': product.product_description,
                'image': product.product_image.url
            }
            final_response.append(product_data)
        return JsonResponse(final_response,safe=False)

    def post(self, request, catalogid):
        requested_catalog = Catalog.objects.filter(id=catalogid)[0]
        name = request.POST.get('product-name')
        price = request.POST.get('product-price')
        description = request.POST.get('product-description')
        image = request.FILES['product-image']
        CatalogProduct.objects.create(
            catalog_name=requested_catalog,
            product_name=name, 
            product_price=price, 
            product_description=description,
            product_image=image
        ).save()
        return JsonResponse({'message': 'success'})
    
    def put(self, request, catalogid):
        requested_catalog = Catalog.objects.filter(id=catalogid)[0]
        PUT, files = request.parse_file_upload(request.META, request)
        PUT = PUT.dict()

        product_id = PUT['product-id']
        name = PUT['product-name']
        price = PUT['product-price']
        description = PUT['product-description']

        old_product = CatalogProduct.objects.filter(catalog_name=requested_catalog, id=product_id)
        old_image = old_product[0].product_image

        try:
            request.FILES.update(files)
            image = request.FILES['product-image']
        except:
            image = old_image

        old_product.update(
            product_name=name,
            product_price=price,
            product_description=description,
            product_image=image
        )

        return JsonResponse({'message': 'success'})

    def delete(self, request, catalogid):
        requested_catalog = Catalog.objects.filter(id=catalogid)[0]
        product_id = request.GET.get('product-id')
        CatalogProduct.objects.filter(catalog_name=requested_catalog, id=product_id).delete()
        return JsonResponse({'message': 'success'}, safe=False)
        