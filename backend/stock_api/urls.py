from django.urls import path
from .views import StockList

app_name = 'stock_api'

urlpatterns = [
    # default endpoint for get, post stock apis
    path('', StockList.as_view(), name="stocklist"),
    # put api for stock
    path('<int:pk>/', StockList.as_view(), name="stockupdate"),
]
