from rest_framework.serializers import ModelSerializer

from payments.models import Payment
from tables.api.serializers import TablesSerializer

class PaymentSerializer(ModelSerializer):
    table_data = TablesSerializer(source='table', read_only=True)
    class Meta:
        model = Payment
        fields = ['id', 'table', 'table_data', 'totalPayment',
                  'paymentType', 'statusPayment', 'created_at']