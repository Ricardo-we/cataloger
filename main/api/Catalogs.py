from django.views import View
from main.models import Catalog, Users
from django.http import JsonResponse

class Catalogs(View):
    def get(self, request,id=0):
        username = Users.objects.filter(username=request.GET.get('username')).first()
        if username is None: return JsonResponse({'message': 'Username not found'}, status=404)

        user_catalogs = list(Catalog.objects.filter(username=username).values())
        return JsonResponse(user_catalogs, safe=False)

    def post(self, request, id=0):
        try:
            print(request.POST.get('username'))
            catalog_user = Users.objects.get(username=request.POST.get('username'))
            catalog_name = request.POST.get('catalog-name')
            currency = request.POST.get('currency')
            Catalog.objects.create(username=catalog_user, currency=currency,catalog_name=catalog_name)

            return JsonResponse({'message': 'success'})
        except Exception as e:
            return JsonResponse({'message': str(e)})
            
    def put(self, request, id):
        new_catalog_name = request.GET.get('catalog-name')
        currency = request.GET.get('currency')

        Catalog.objects.filter(id=id).update(catalog_name=new_catalog_name, currency=currency)
        return JsonResponse({'message': 'success'}, safe=False)

    def delete(self, request, id):
        Catalog.objects.filter(id=id).delete()
        return JsonResponse({'message': 'success'}, safe=False)