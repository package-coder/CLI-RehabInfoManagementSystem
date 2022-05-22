import uuid
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sysId = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    address = models.CharField(max_length=100)


class Patient(models.Model):
    firstName = models.CharField(max_length=50, blank=False, null=False)
    lastName = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField()
    age = models.IntegerField()
    birthday = models.DateField()
    illness = models.CharField(max_length=100)
    dateAdmitted = models.DateField(null=False)
    dateDischarge = models.DateField(null=True, default=None)
    isDischarged = models.BooleanField(default=False)


class Room(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    description = models.TextField()
    floor = models.IntegerField()
