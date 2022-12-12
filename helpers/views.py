from django.shortcuts import render
from django.http.request import HttpRequest
from .models import Helper
from .services.HelperService import HelperService
from .serializers import HelperSerializer
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse

helper_service = HelperService()

def get_helpers(request: HttpRequest):
    if request.method == "GET":
        categorie_name = request.GET.get("languages") or "languages"
        filtered_helpers = helper_service.get_helper_by_categorie_name(categorie_name).all()
        serialized_data = HelperSerializer(filtered_helpers, many=True)
        return JsonResponse(serialized_data.data, safe=False)