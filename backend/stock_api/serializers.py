from django.db.models import fields
from rest_framework import serializers
from stock.models import Stocks 
from django.contrib.auth.models import User

# serializer stock data for JSON
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'