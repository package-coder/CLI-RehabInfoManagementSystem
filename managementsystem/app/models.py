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


class Room(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    floor = models.IntegerField()


class Patient(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50, blank=False, null=False)
    lastName = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    age = models.IntegerField(default=0)
    birthday = models.DateField()
    illness = models.CharField(max_length=100)
    dateAdmitted = models.DateField(null=False)
    dateDischarge = models.DateField(null=True, default=None)
    isDischarged = models.BooleanField(default=False)
