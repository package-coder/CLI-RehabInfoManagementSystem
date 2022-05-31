from django.http import HttpResponse
from django.contrib.auth.models import User

from rest_framework import generics

from .serializers import (
    UserSerializer,
    EmployeeSerializer,
    PatientSerializer,
    RoomSerializer
)

from .models import (
    Employee,
    Patient,
    Room
)


from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def get_user_serializer_class(self):
        return UserSerializer

    def get_post_response_data(self, request, token, instance):
        data = super().get_post_response_data(request, token, instance)
        id = data['user']['id']

        try:
            entry = Employee.objects.get(sysId=id)
            data['employee'] = EmployeeSerializer(entry).data

        except Employee.DoesNotExist:
            pass

        return data

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EmployeeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class PatientList(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer




class RoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
