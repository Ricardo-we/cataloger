from django.shortcuts import render, redirect
from .models import Catalog, Users, CatalogProduct
from django.http import HttpResponse, JsonResponse
import smtplib
from helpers.services.HelperService import HelperService
# Create your views here.


def login(request):
    return render(request, 'main/login/login.html', {})


def check_user(request):
    try:
        if(request.method == 'POST'):
            username = request.POST.get('username')
            email = request.POST.get('email')
            password = request.POST.get('password')

            if(Users.objects.filter(username=username, password=password, email=email).exists()):
                return redirect(f'/home/?username={username}')
            else:
                return render(request, 'main/login/login.html', {'failed': 'true'})
    except:
        return redirect('/login')


def manage_catalog_products(request, catalogid):
    requested_catalog = Catalog.objects.filter(id=catalogid)[0]
    catalog_products = CatalogProduct.objects.filter(catalog_name=requested_catalog)

    def product_template_response(product):
        return {
            'id': product.id,
            'name': product.product_name,
            'price': product.product_price,
            'description': product.product_description,
            'image': product.product_image.url,
            'currency': requested_catalog.currency
        }

    if(request.GET.get('get-products') == 'true'):
        final_response = []
        for product in catalog_products:
            product_data = product_template_response(product)
            final_response.append(product_data)

        return JsonResponse(final_response, safe=False)

    elif(request.method == 'POST' and not request.GET.get('method') == 'PUT'):
        try:
            name = request.POST.get('product-name')
            price = request.POST.get('product-price')
            description = request.POST.get('product-description')
            image = request.FILES['product-image']

            product = CatalogProduct.objects.create(
                catalog_name=requested_catalog,
                product_name=name,
                product_price=price,
                product_description=description,
                product_image=image
            )
            product.save()

            product = CatalogProduct.objects.filter(id=product.id)[0]

            return JsonResponse(product_template_response(product), safe=False)
        except:
            return JsonResponse({'message': 'failed'})

    elif(request.method == 'DELETE' and request.GET.get('product-id')):
        product_id = request.GET.get('product-id')
        CatalogProduct.objects.filter(catalog_name=requested_catalog, id=product_id).delete()
        return JsonResponse({'message': 'success'}, safe=False)

    elif(request.method == 'POST' and request.GET.get('method') == 'PUT'):
        try:
            product_id = request.POST.get('product-id')
            old_product = CatalogProduct.objects.get(id=product_id)

            old_product.product_name = request.POST.get('product-name')
            old_product.product_price = request.POST.get('product-price')
            old_product.product_description = request.POST.get('product-description')
            if len(request.FILES) > 0:
                old_product.product_image = request.FILES['product-image']

            old_product.save()

            return JsonResponse(product_template_response(old_product), safe=False)
        except:
            return JsonResponse({'message': 'failed'}, safe=False)

    return render(request, 'main/catalog-views/manage-catalog-products.html', {'catalog_id': catalogid})


def create_user(request):
    try:

        if(request.method == 'POST'):
            new_user = request.POST.get('username')
            new_password = request.POST.get('password')
            new_email = request.POST.get('email')

            for user in Users.objects.all():
                if user.username == new_user or user.email == new_email:
                    return render(request, 'main/login/create-user.html', {'failed': 'true'})

            final_new_user = Users.objects.create(username=new_user, password=new_password, email=new_email)
            final_new_user.save()

            return redirect(f'/home/?username={new_user}&first-time=true')
    except: pass
    return render(request, 'main/login/create-user.html', {'failed': ''})


def home(request):
    username = request.GET.get('username')
    first_time = request.GET.get('first-time')
    currency_codes = HelperService.get_helper_by_categorie_name("languages").all()
    if not username:
        return redirect('/login')
    return render(
        request,
        'main/catalog-views/home.html',
        {'username': username, 'first_time': first_time, "currency_codes": currency_codes}
    )


def manage_products_view(request, catalogid):
    username = request.GET.get('username')
    return render(request, 'main/catalog-views/manage-catalog-products.html', {'catalog_id': catalogid, 'username': username})


def product_detail_management(request, catalog_id, product_id):
    product = CatalogProduct.objects.get(id=product_id)
    catalog = Catalog.objects.get(id=catalog_id)
    context = {
        'product': product,
        'catalog': catalog
    }

    return render(request, 'main/catalog-views/single-product-view-management.html', context)


def catalog_view(request, catalog_id):
    requested_catalog = Catalog.objects.get(id=catalog_id)

    context = {
        'catalog_name': requested_catalog.catalog_name,
        'products': CatalogProduct.objects.filter(catalog_name=requested_catalog).all(),
        'author': requested_catalog.username.username
    }
    return render(request, 'main/catalog-views/catalog-view.html', context)


def product_detail_view(request, catalog_id, product_id):
    product = CatalogProduct.objects.get(id=product_id)
    catalog = Catalog.objects.get(id=catalog_id)
    context = {
        'product': product,
        'catalog': catalog
    }

    return render(request, 'main/catalog-views/single-product-view.html', context)


def get_ip_send_mail(request):
    client_ip = request.META.get('REMOTE_ADDR')
    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.starttls()
    smtp_server.login('testerricardo50@gmail.com', 'mami_1981')
    smtp_server.sendmail('testerricardo50@gmail.com', 'testerricardo50@gmail.com', client_ip)
    smtp_server.quit()

    return redirect('/')
