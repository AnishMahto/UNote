from django.db import models

# Create your models here.
class Program (models.Model):
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=200)