from helpers.models import Helper, HelperCategorie

class HelperService:
    def __init__(self):
        pass

    def get_helper_by_categorie_name(self, categorie_name):
        helper_categorie = HelperCategorie.objects.filter(name=categorie_name).first()
        return Helper.objects.filter(helper_categorie_id=helper_categorie.id)

    @staticmethod
    def get_helper_by_categorie_name(categorie_name):
        helper_categorie = HelperCategorie.objects.filter(name=categorie_name).first()
        if not helper_categorie: return []
        return Helper.objects.filter(helper_categorie_id=helper_categorie.id).all()
        