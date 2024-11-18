from rest_framework.serializers import ModelSerializer
from tables.models import Table

class TablesSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'number']