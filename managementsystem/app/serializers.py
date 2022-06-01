from datetime import date
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Patient
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


class PatientSerializer(serializers.ModelSerializer):
    dateAdmitted = serializers.DateField(required=True, initial=date.today)
    birthdate = serializers.DateField(required=True, initial=date.today)

    class Meta:
        model = Patient
        fields = '__all__'


