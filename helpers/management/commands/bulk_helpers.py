from os import path
import json
from django.core.management.base import BaseCommand
from helpers.models import Helper, HelperCategorie
from django.conf import settings


class Command(BaseCommand):

    def handle(self, *args, **options):
        return self.bulk()

    def bulk(self):
        # OnlineCatalogs\resources\data\json\language-codes.json
        JSON_PATH = path.join(settings.BASE_DIR, "resources", "data", "json", "language-codes.json")
        with open(JSON_PATH, "r", encoding="utf8") as json_file:
            data = json.loads(json_file.read())
        helper, created = HelperCategorie.objects.get_or_create(name="languages")
        Helper.objects.filter(helper_categorie_id=helper.id).delete()
        def map_func(v):
            item_key_val = list(list(v.items())[0])
            return Helper(code=item_key_val[0] + item_key_val[1], helper_categorie_id=helper.id)
            # return {"code": v.values()[0], "helper_categorie_id": helper.id}
        mapped_data = map(map_func, data)
        
        Helper.objects.bulk_create(mapped_data)
        print("SUCCESS")
