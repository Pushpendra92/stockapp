from django.http.response import Http404
from rest_framework import generics
from rest_framework.views import APIView
from stock.models import Stocks
from .serializers import StockSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# class StockList(generics.ListCreateAPIView):


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['isAdmin'] = self.user.is_staff
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class StockList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        current_user = request.user
        if current_user.is_staff:
            snippets = Stocks.objects.all()
        else:
            snippets = Stocks.objects.filter(permitted_to_all = True)
        serializer = StockSerializer(snippets, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
    def get_object(self, pk):
        try:
            val = Stocks.objects.get(pk=pk)
            return val
        except Stocks.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        pass
        snippet = self.get_object(pk)
        serializer = StockSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)