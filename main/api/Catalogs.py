from django.views import View
from main.models import Catalog, Users
from django.http import JsonResponse

class Catalogs(View):
    def get(self, request,id=-1):
        username = request.GET.get('username')
        username = Users.objects.filter(username=username)
        user_catalogs = list(Catalog.objects.filter(username=username[0]).values())
        return JsonResponse(user_catalogs, safe=False)

    def post(self, request, id=-1):
        try:
            catalog_user = Users.objects.filter(username=request.POST.get('username'))
            catalog_name = request.POST.get('catalog-name')
            currency = request.POST.get('currency')
            print(currency)
            new_catalog = Catalog.objects.create(username=catalog_user[0], currency=currency,catalog_name=catalog_name)
            new_catalog.save()
            return JsonResponse({'message': 'success'})
        except:
            return JsonResponse({'message': 'failed'})
            
    def put(self, request, id):
        new_catalog_name = request.GET.get('catalog-name')
        currency = request.GET.get('currency')
        print(currency)
        Catalog.objects.filter(id=id).update(catalog_name=new_catalog_name, currency=currency)
        return JsonResponse({'message': 'success'}, safe=False)

    def delete(self, request, id):
        Catalog.objects.filter(id=id).delete()
        return JsonResponse({'message': 'success'}, safe=False)