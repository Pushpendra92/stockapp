from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

#Model for stock info
class Stocks(models.Model):
    stock_name = models.CharField(max_length=100)
    permitted_to_all = models.BooleanField(default=False)
    stock_price_info = models.JSONField(max_length=100)

    def __str__(self):
        return self.stock_name