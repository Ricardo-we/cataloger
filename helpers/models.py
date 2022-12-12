from django.db import models

# Create your models here.


class HelperCategorie(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        verbose_name = "Helper Categorie"
        verbose_name_plural = "Helper Categories"


class Helper(models.Model):
    code = models.CharField(max_length=255, unique=True)
    extra = models.CharField(max_length=300)
    helper_categorie = models.ForeignKey(HelperCategorie, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Helper'
        verbose_name_plural = 'Helpers'
