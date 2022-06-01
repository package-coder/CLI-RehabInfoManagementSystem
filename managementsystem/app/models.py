import uuid
from django.contrib.auth.models import User
from django.db import models


class Patient(models.Model):
    firstName = models.CharField(max_length=50, blank=False, null=False)
    lastName = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    birthdate = models.DateField()
    contact = models.CharField(max_length=11)
    gender = models.TextField(max_length=10)
    address = models.CharField(max_length=100, null=True, blank=True)
    illness = models.CharField(max_length=100)
    dateAdmitted = models.DateField()
    dateDischarged = models.DateField(null=True)
