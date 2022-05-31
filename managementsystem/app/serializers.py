from datetime import date
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Employee,
    Patient,
    Room
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance

    def create(self, validated_data):
        user = super().create(validated_data)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.set_password(validated_data['password'])
        user.save()
        return user


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(read_only=True)
    dateAdmitted = serializers.DateField(required=True, initial=date.today)
    birthdate = serializers.DateField(required=False)

    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        today = date.today()
        birthdate = validated_data.get('birthdate', today)
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        validated_data['age'] = age
        return super().create(validated_data)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
