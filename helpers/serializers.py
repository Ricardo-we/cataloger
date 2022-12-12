from rest_framework import serializers
from .models import Helper, HelperCategorie

class HelperSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Helper
        fields = "__all__"

class HelperCategorieSerializer(serializers.ModelSerializer):
    class Meta: 
        model = HelperCategorie
        fields = "__all__"

