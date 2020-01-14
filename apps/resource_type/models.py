from django.db import models

# Create your models here.
class ResourceType (models.Model):
    value = models.CharField(max_length=100)
    label = models.CharField(max_length=100)