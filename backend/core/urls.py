import stock_api
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    #delegate all endpoints to stock_api app
    path('api/', include('stock_api.urls', namespace='stock_api')),
    #login api
    path('api/login/', stock_api.views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
